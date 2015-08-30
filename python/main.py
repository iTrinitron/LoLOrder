# execfile("main.py")

from urllib2 import Request, urlopen, URLError
import dbConnection as db
import json
import time
import base64
import sys

connection = db.connection

#conda install -c https://conda.binstar.org/anaconda libsodium

try:
    import matplotlib.pyplot as plt
## import libsodium
except:
    raise

apiKey = ""

## Loads a match from the Riot API
def loadMatch(matchId, region):
	region =  region.lower()
	requestString = "https://" + region + ".api.pvp.net/api/lol/" + region + "/v2.2/match/" + str(matchId) + "?includeTimeline=true&api_key=" + apiKey
	return apiCall(requestString)

def apiCall(requestStr):
	request = Request(requestStr)
	retries = 1
	success = False
	while not success:
	    try:
	        response = urlopen(request)
	        success = True
	        return json.load(response)
	    except Exception as e:
	        wait = retries * 10;
	        print 'Error! Waiting %s secs and re-trying...' % wait
	        sys.stdout.flush()
	        time.sleep(wait)
	        retries += 1

# Get Tracked Items
trackedItemIds = []

with connection.cursor() as cursor:
	# Create a new record
	sql = "SELECT `item_id` FROM " + db.items_table
	cursor.execute(sql)
	result = cursor.fetchall()
	for r in result:
		trackedItemIds.append(r['item_id'])

# Get Tracked Champs
trackedChampIds = []

with connection.cursor() as cursor:
	# Create a new record
	sql = "SELECT `champ_id` FROM " + db.champs_table
	cursor.execute(sql)
	result = cursor.fetchall()
	for r in result:
		trackedChampIds.append(r['champ_id'])

# Get Matches
trackedMatches = []

with connection.cursor() as cursor:
	# Create a new record
	sql = "SELECT `match_id`, `game_version`, `region` FROM " + db.match_table + " WHERE complete=0 AND region != 'NA'"
	cursor.execute(sql)
	result = cursor.fetchall()
	for r in result:
		trackedMatches.append(r)

completed = 0
timer = 1
total = len(trackedMatches)

for match in trackedMatches:
	matchId = match['match_id']
	region = match['region']
	print "Processing Match: " + str(matchId)
	matchData = loadMatch(matchId, region)

	duration = matchData['matchDuration']
	
	gameVersion = match['game_version']

	## Participant Champion
	participants = matchData['participants']
	participantData = {}

	## Data updated throughout the match
	runningData = {}

	## Only look at participants with champions we care about
	targetPIds = []
	for p in participants:
		if p["championId"] in trackedChampIds:
			if p["spell1Id"] != "11" and p["spell2Id"] != "11":
				pId = p["participantId"]
				targetPIds.append(pId)
				participantData[pId] = {}
				participantData[pId]['items'] = []

				participantData[pId]['stats'] = {
					'champId': p["championId"],
					'won': p['stats']['winner'],
					'kills': p['stats']['kills'],
					'deaths': p['stats']['deaths'],
					'assists': p['stats']['assists'],
					'minionsKilled': p['stats']['minionsKilled'],
					'goldEarned': p['stats']['goldEarned']
				}

				runningData[pId] = {
					'kills': 0,
					'deaths': 0,
					'assists': 0
				}

	## Parse Timeline
	timeline = matchData["timeline"]
	frames = timeline["frames"]
	frame = frames[0]

	count = 0
	for frame in frames: 
		if frame.has_key("events"):
			events = frame["events"]
			for event in events:
				eType = event["eventType"]

				## Track Kills / Assists
				if eType == "CHAMPION_KILL":
					killer = event['killerId']
					victim = event['victimId']
					## Did someone we care about kill
					if killer in targetPIds:
						runningData[killer]['kills'] += 1
					if victim in targetPIds:
						runningData[victim]['deaths'] += 1
					if event.has_key('assistingParticipantIds'):
						supporters = event['assistingParticipantIds']

						for s in supporters:
							if s in targetPIds:
								runningData[s]['assists'] += 1

				##
				elif eType == "ITEM_PURCHASED":
					ePId = event["participantId"]
					if ePId in targetPIds:
						itemId = event["itemId"]
						if itemId in trackedItemIds:
							itemData = {
								"itemId": itemId,
								"data": frame["participantFrames"][str(ePId)],
								"timestamp": event['timestamp'],
								'kills': runningData[ePId]['kills'],
								'deaths': runningData[ePId]['deaths'],
								'assists': runningData[ePId]['assists']
							}
							participantData[ePId]['items'].append(itemData)
				elif eType == "ITEM_UNDO":
					ePId = event["participantId"]
					if ePId in targetPIds:
						itemId = event["itemBefore"]
						if itemId in trackedItemIds:
							participantData[ePId]['items'].pop()

	## For each participant
	with connection.cursor() as cursor:
		for p in participantData:
			itemStr = ""
			for i in participantData[p]['items']:
				itemStr = itemStr + "." + str(i['itemId'])
				itemHash = base64.b64encode(itemStr)
				p_champId = participantData[p]['stats']['champId']
				p_timestamp = i['timestamp']
				gold = i['data']['totalGold']
				cs = i['data']['minionsKilled']
				kills = i['kills']
				deaths = i['deaths']
				assists = i['assists']
				won = participantData[p]['stats']['won'] if 1 else 0
				# Create a new record for the match
				sql = "INSERT INTO " + db.match_data_table + " (`game_version`, `region`, `match_id`, `p_id`, `champion_id`, `item_hash`, `timestamp`, `gold`, `kills`, `death`, `cs`, `assist`, `won_game`, `end_game_time`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
				cursor.execute(sql, (gameVersion, region, matchId, p, p_champId, itemHash, p_timestamp, gold, kills, deaths, cs, assists, won, duration))

		# Indicate that the match was processed
		sql = "UPDATE " + db.match_table + " SET complete=1 WHERE `match_id`=%s AND `game_version`=%s AND `region`=%s"
		cursor.execute(sql, (matchId, gameVersion, region))

		connection.commit()
		completed += 1
		if completed == (timer*500):
			timer += 1
			print "...processed (" + str(completed) + "/" + str(total) + ") matches"
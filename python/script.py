from urllib2 import Request, urlopen, URLError
import json

matchId = "1900735825"
apiKey = ""

requestString = "https://na.api.pvp.net/api/lol/na/v2.2/match/" + matchId + "?includeTimeline=true&api_key=" + apiKey
request = Request(requestString)

try:
	response = urlopen(request)
	matchData = json.load(response)  
except URLError, e:
    print 'ERROR:', e

## Get Items
requestString = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?api_key=" + apiKey
request = Request(requestString)

try:
	response = urlopen(request)
	itemData = json.load(response)  
except URLError, e:
    print 'ERROR:', e

itemData["data"]

trackedItems = [
	"Luden's Echo",
	"Rabadon's Deathcap",
	"Wit's End",
	"Abyssal Scepter",
	"Archangel's Staff",
	"Athene's Unholy Grail",
	"Lich Bane",
	"Liandry's Torment",
	"Mejai's Soulstealer",
	"Morellonomicon",
	"Rod of Ages",
	"Rylai's Crystal Scepter",
	"Will of the Ancients",
	"Void Staff",
	"Staff of Flowing Water"
]

## Get all champions
## Get Items
requestString = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=" + apiKey
request = Request(requestString)

try:
	response = urlopen(request)
	champDatum = json.load(response)  
except URLError, e:
    print 'ERROR:', e

## Turn champions into champ[id] == name
champData = champDatum["data"]
champName = {}
for champ in champData:
	champName[champData[champ]["id"]] = champData[champ]["name"]




##429 is too many requests 

## Participant Champion
participants = matchData['participants']
pChampion = {}
for p in participants:
	if pChampion.has_key(p["participantId"]):
		pChampion[p["participantId"]].append(champName[p["championId"]])
	else:
		pChampion[p["participantId"]] = [champName[p["championId"]]]
 

## Parse Timeline
timeline = matchData["timeline"]

frames = timeline["frames"]

frame = frames[0]

participantItemPairs = []

count = 0
for frame in frames: 
	if frame.has_key("events"):
		events = frame["events"]
		for event in events:
			if event["eventType"] == "ITEM_PURCHASED":
				itemId = str(event["itemId"])
				itemName = itemData["data"][itemId]["name"]
				if itemName in trackedItems:
					participantItemPairs.append([event["participantId"], itemName])

print participantItemPairs

participantItems = {}

## Figure out build orders
for pItemPair in participantItemPairs:
	if participantItems.has_key(pItemPair[0]):
		participantItems[pItemPair[0]].append(pItemPair[1])
	else:
		participantItems[pItemPair[0]] = [pItemPair[1]]

for participantItem in participantItems:
	print " "
	for item in participantItems[participantItem]:
		print item

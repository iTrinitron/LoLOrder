from __future__ import division
import base64
import dbConnection as db


# execfile("getItems.py")

# 1852691966

connection = db.connection

# Get all matches that have not been aggregated
with connection.cursor() as cursor:
	print "Calculating differences..."
	completed = 0
	timer = 1

	sql = "SELECT `match_id`, `game_version`, `region` FROM " + db.match_table + " WHERE aggregated=0 AND complete=1"
	cursor.execute(sql)
	#result = [1]
	result = cursor.fetchall()

	total = len(result)
	
	## For each match
	for r in result:
		matchId = r['match_id']
		gameVersion = r['game_version']
		region = r['region']

		## Get all item builds for that match
		#sql = "SELECT * FROM `match_data` WHERE match_id = %s AND region = %s AND game_version = %s"
		sql = "SELECT * FROM `match_data` WHERE match_id = %s AND region = %s AND `game_version` = %s ORDER BY `timestamp`"
		cursor.execute(sql, (matchId, region, gameVersion))
		itemBuilds = cursor.fetchall()

		playerBuilds = {}
# execfile("calcDiff.py")
		for b in itemBuilds:
			pId = b['p_id']
			if pId in playerBuilds:
				# get the old build
				ob = playerBuilds[pId]
				# calculate the differences
				duration = b['timestamp'] - ob['timestamp']
				x = duration / 1000
				x /= 60
				minutes = x % 60
				deaths = round(((b['death'] - ob['death']) / minutes), 2)
				cs = round(((b['cs'] - ob['cs']) / minutes), 2)
				gold = round(((b['gold'] - ob['gold']) / minutes), 2)
				assists = round(((b['assist'] - ob['assist']) / minutes), 2)
				kills = round(((b['kills'] - ob['kills']) / minutes), 2)
				p = ob['p_id']
				p_champId = ob['champion_id']
				p_timestamp = ob['timestamp']
				won = ob['won_game']
				duration = ob['end_game_time']
				sep = '.'

				itemStr = base64.b64decode(ob['item_hash'])
				spl = itemStr.split(sep)
				item_id = spl.pop()
				pItemStr = '.'.join(spl)
				p_hash = base64.b64encode(pItemStr)

				sql = "INSERT INTO " + db.match_data_per_min_table + " (`game_version`, `region`, `match_id`, `p_id`, `champion_id`, `p_hash`, `item_id`, `timestamp`, `gold`, `kills`, `death`, `cs`, `assist`, `won_game`, `end_game_time`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
				cursor.execute(sql, (gameVersion, region, matchId, p, p_champId, p_hash, item_id, p_timestamp, gold, kills, deaths, cs, assists, won, duration))

			playerBuilds[pId] = b

		sql = "UPDATE " + db.match_table + " SET aggregated=1 WHERE `match_id`=%s AND `game_version`=%s AND `region`=%s"
		cursor.execute(sql, (matchId, gameVersion, region))
		connection.commit()
		completed += 1
		if completed == (timer*500):
			timer += 1
			print "...processed (" + str(completed) + "/" + str(total) + ") matches"


## Database Connection
# execfile("insertItems.py")
# Populates the items table

from urllib2 import Request, urlopen, URLError
import dbConnection as db
import json

connection = db.connection

apiKey = ""

def apiCall(requestStr):
	request = Request(requestStr)
	try:
		response = urlopen(request)
		return json.load(response)  
	except URLError, e:
	    print 'ERROR:', e

requestStr = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?itemListData=all&api_key=" + apiKey
items = apiCall(requestStr)['data']

def parseData(fname):
	yield json.load(open(fname))
				
# Items we are analyzing
targetItems = [
"Abyssal Scepter",
"Athene's Unholy Grail",
"Guinsoo's Rageblade",
"Iceborn Gauntlet",
"Liandry's Torment",
"Lich Bane",
"Nashor's Tooth",
"Morellonomicon",
"Rabadon's Deathcap",
"Rod of Ages",
"Rylai's Crystal Scepter",
"Trickster's Glass",
"Will of the Ancients",
"Void Staff",
"Zhonya's Hourglass",
"Twin Shadows",
"Staff of Flowing Water",
"Mejai's Soulstealer",
"Luden's Echo",
"Ohmwrecker",
"Manamune",
"Archangel's Staff"
]

itemPairs = []

for item in items:
	itemName = items[item]['name']
	if itemName in targetItems:
		itemPairs.append([item, itemName])
	
# print itemPairs
# print len(itemPairs)
# print len(targetItems)

for item in itemPairs:
	if item[1] not in targetItems:
		print item[1]



# Insert Riot Items
try:
    with connection.cursor() as cursor:
		# Parse every region
		for item in itemPairs:
			# Create a new record
			sql = "INSERT INTO " + db.items_table + "(`item_id`, `item_name`) VALUES (%s, %s)"
			cursor.execute(sql, (item[0], item[1]))
				
			#Save changes
			connection.commit()
			print "Inserted " + item[1]
finally:
    connection.close()
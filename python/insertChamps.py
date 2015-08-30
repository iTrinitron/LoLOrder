## Database Connection
# execfile("insertChamps.py")
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

requestStr = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key=" + apiKey
champs = apiCall(requestStr)['keys']

def parseData(fname):
	yield json.load(open(fname))
				
# Items we are analyzing
targetChamps = [
"Cassiopeia",
"Heimerdinger",
"Twisted Fate",
"Brand",
"Anivia",
"Ziggs",
"Karthus"
"Orianna",
"Xerath",
"Ekko",
"Kassadin",
"Veigar",
"Syndra",
"Malzahar",
"Azir",
"Ahri",
"Fizz",
"Galio",
"Katarina",
"Diana",
"LeBlanc",
"Lux",
"Lissandra",
"Vel'Koz",
"Ryze",
"Kennen",
"Lulu",
"Annie"
]

champPairs = []

for champ in champs:
	champName = champs[champ]
	if champName in targetChamps:
		champPairs.append([champ, champName])
	
# print len(itemPairs)
# print len(targetItems)



# Insert Riot Items
try:
    with connection.cursor() as cursor:
		# Parse every region
		for champ in champPairs:
			# Create a new record
			sql = "INSERT INTO " + db.champs_table + "(`champ_id`, `champ_name`) VALUES (%s, %s)"
			cursor.execute(sql, (champ[0], champ[1]))
				
			#Save changes
			connection.commit()
			print "Inserted " + champ[1]
finally:
    connection.close()
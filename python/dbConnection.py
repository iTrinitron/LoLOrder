## Database Connection
# execfile("insertItems.py")
# Populates the items table

import pymysql

# Connect to the database
ip = ""
usr = ""
pwd = ""
database = "rapi"
connection = pymysql.connect(host=ip, user=usr, password=pwd, db=database, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)

items_table = "items"
champs_table = "champions"
match_data_table = "match_data"
match_table = "matches"
match_data_per_min_table = "match_data_per_min"
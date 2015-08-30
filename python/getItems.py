import dbConnection as db

# execfile("getItems.py")

connection = db.connection

# Insert Riot Items
try:
    with connection.cursor() as cursor:

			# Create a new record
			sql = "SELECT `item_id`, `item_name` FROM " + db.items_table
			cursor.execute(sql)
			result = cursor.fetchall()
			print result
finally:
    connection.close()
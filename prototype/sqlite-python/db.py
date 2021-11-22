# DB Demo - Python SQLite3

import json
import sqlite3
import pickle 

conn = sqlite3.connect('recipe.db')
cur = conn.cursor()

# Create DB
cur.execute('DROP TABLE IF EXISTS Recipe')
cur.execute('''
    CREATE TABLE IF NOT EXISTS Recipe(
        name STR NOT NULL PRIMARY KEY, # TODO: Determine primary key
        json BLOB,	
        author STR,					   # TODO: Determine items to preload
        ingredients BLOB,
        cook_time STR
    )''')

# Load json and preload items
with open('lamb.json') as f:
	src = json.load(f)
	
recipe = src['@graph'][-1]
src = pickle.dumps(src) # convert dict to bytestring
name = recipe['name']
author = recipe['author']['name']
cook_time = recipe['cookTime']
ingredients = pickle.dumps(recipe['recipeIngredient'])

# Insert to table
cur.execute('''
	INSERT INTO Recipe
	VALUES (?, ?, ?, ?, ?)
''', (name, src, author, ingredients, cook_time))

conn.commit()

# Sample query
cur.execute('''
	SELECT * FROM Recipe
''')

(name, src, author, ingredients, cook_time) = cur.fetchone()
src = pickle.loads(src)	# retrieve dict from bytestring
ingredient = pickle.loads(ingredients)

print('name:', name)
print('author:', author)
print('cook_time:', cook_time)
print('ingredients:', ingredients)
print('json:', src)

conn.close()

# https://pynative.com/python-sqlite-blob-insert-and-retrieve-digital-data/
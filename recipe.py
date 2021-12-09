'''
recipe.py

Description:
    Creates the Recipes database and updates it
Requirements:
    sqlite3, spoonacular, pickle, requests, json
References:
    https://slacker.ro/2020/03/10/how-to-create-a-food-website-using-the-spoonacular-api-python-flask/
    https://rapidapi.com/blog/build-food-website/
'''

import sqlite3
import pickle
import requests

'''
    Recipe_DB

    Contains and modifies the Recipe database table
'''
class Recipe_DB:
    def __init__(self):
        ''' Sets Spoonacular info and creates tables in database '''

        # Spoonacular
        self.url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/'
        self.API_KEY = '4f1ffcfc75434032a0fbe8e32a91f561'
        self.headers = {
            'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'x-rapidapi-key': self.API_KEY
        }

        # Create Recipe DB
        self.conn = sqlite3.connect('recipe.db', check_same_thread=False)
        self.cur = self.conn.cursor()
        '''
            ID: recipe ID
            name: recipe name
            author: recipe author
            url: recipe url (?)
            src: recipe json file
            image: recipe image
        '''
        self.cur.execute('''
            CREATE TABLE IF NOT EXISTS Recipes( 
                ID INT PRIMARY KEY,
                name TEXT,
                author TEXT,
                url TEXT,
                src BLOB,
                image BLOB
            )''')

        # Spoonacular IDs have 7 digits; custom have one more to avoid collision
        self.custom_recipe_count = 10000000
        self.cur.execute('SELECT MAX(ID) FROM Recipes')
        result = self.cur.fetchone()
        if result[0] != None and result[0] >= self.custom_recipe_count:
            self.custom_recipe_count = result[0] + 1

    def searchRecipeByKeyword(self, keyword):
        ''' Search by keyword. Get recipe IDs from spoonacular.

        Args:
            keyword (String): search phrase for recipes

        Returns:
            Integer[] : a list of recipe IDs
        '''

        # Search by keyword. Get recipe IDs from spoonacular, update DB, and return results

        url = 'https://api.spoonacular.com/recipes/complexSearch?query=%s&apiKey=%s&includeNutrition=false' % (
            keyword, self.API_KEY)
        recipe = requests.request('GET', url, headers=self.headers).json()
        return recipe['results']
        
    def searchRandomRecipes(self):
        ''' Retrieve random recipes to populate home page using Spoonacular.

        Returns:
            JSON Object List: list of recipes with data in JSON-like structure
        '''

        url = 'https://api.spoonacular.com/recipes/random?apiKey=%s&number=10' % (
            self.API_KEY)
        recipe = requests.request('GET', url, headers=self.headers).json()

        return recipe['recipes']

    def cacheRecipe(self, ID, src):
        ''' Adds recipe to the Recipe database for fewer calls to Spoonacular

        Args:
            ID (Integer): recipe ID from spoonacular
            src (JSON Object): recipe data from spoonacular
        '''

        try:
            # Create recipe with ID, name, author, URL, src, image
            name = src['title']
            author = 'Spoonacular'
            url = src['sourceUrl']
            source = pickle.dumps(src)
            image = src['image']

            self.cur.execute('INSERT INTO Recipes(ID, name, author, url, src, image) VALUES(?, ?, ?, ?, ?, ?);',
                             (ID, name, author, url, source, image))
            self.conn.commit()
        except sqlite3.IntegrityError as er:  # username is primary key so no duplicates allowed
            print('ERROR: Recipe ' + name + ' already exists.')

    def fetchRecipeByID(self, ID):
        ''' Fetch detailed recipe data from the database/Spoonacular using recipe ID

        Args:
            ID (Integer): recipe ID from spoonacular

        Returns:
            JSON Object: JSON-like structure
        '''

        # Try searching in database first
        self.cur.execute('SELECT src FROM Recipes WHERE ID = %s' % (ID))
        result = self.cur.fetchall()
        # If found in database, return the recipe data
        if (len(result) != 0):
            return pickle.loads(result[0][0])
        else:
            # Call Spoonacular API
            url = 'https://api.spoonacular.com/recipes/%s/information?apiKey=%s' % (
                ID, self.API_KEY)
            src = requests.request('GET', url, headers=self.headers).json()

            # Cache recipe in DB
            self.cacheRecipe(ID, src)
            return src

    def createRecipe(self, recipe):
        ''' Creates a recipe added by the user and stores in database

        Args:
            recipe (JSON Object): recipe data in JSON-like structure

        Returns:
            Integer: recipe ID of the newly created recipe
        '''

        # Initialize the ID to the next available num
        id = self.custom_recipe_count
        self.custom_recipe_count += 1
        name = recipe['title']
        author = recipe['author']
        recipe['id'] = id

        # Store the recipe in the pickled version
        src = pickle.dumps(recipe)
        self.cur.execute(
            'INSERT INTO Recipes(ID, author, name, src) VALUES(?, ?, ?, ?)', (id, author, name, src))
        self.conn.commit()
        return id

    def updateRecipe(self, id, updatedVal):
        ''' Update the recipe in the database

        Args:
            id (Integer): recipe ID
            updatedVal (JSON Object): new value of the recipe data
        '''

        self.cur.execute('SELECT src FROM Recipes WHERE ID = %d' % (id))
        result = self.cur.fetchall()

        # If no recipe is found, stop execution
        if (len(result) < 1):
            return

        # Load the result
        recipes = pickle.loads(result[0][0])
        for key in updatedVal:
            # Update the author column in database for this recipe
            if (key == 'author'):
                self.cur.execute(
                    'UPDATE Recipes SET author = ? WHERE ID = ?', (updatedVal['author'], id))

            # Update the recipe name column in database for this recipe
            if (key == 'name'):
                self.cur.execute(
                    'UPDATE Recipes SET name = ? WHERE ID = ?', (updatedVal['name'], id))

            recipes[key] = updatedVal[key]
        # Update the recipe data column in database for this recipe
        src = pickle.dumps(recipes)
        self.cur.execute('UPDATE Recipes SET src = ? WHERE ID = ?', (src, id))

        self.conn.commit()

    def removeRecipe(self, id):
        ''' Removes the recipe from the database

        Args:
            id (Integer): recipe ID
        '''
        self.cur.execute('DELETE FROM Recipes WHERE ID = %d' % (id))
        self.conn.commit()

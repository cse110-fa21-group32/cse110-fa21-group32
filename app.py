# Flask app / server

# https://towardsdatascience.com/talking-to-python-from-javascript-flask-and-the-fetch-api-e0ef3573c451
# https://www.youtube.com/watch?v=AsoJL9GPi1k
# requirements: flask

from flask import Flask, jsonify, request, render_template, Response
from flask_cors import CORS
import json
import user_db
import recipe
import pickle

app = Flask(__name__)
CORS(app)
user_db = user_db.User_DB()
recipe_db = recipe.Recipe_DB()

@app.route("/", methods=['GET', 'POST'])
def home_page():
    print(request)
    if request.method == 'POST':
        msg = request.get_json()
        print(msg)

        # USER
        # Register (create) the user
        if msg['type'] == 'register':
            user_db.createUser(msg['username'], msg['password'], msg['email'], '', '')
            return {'msg': 'Success!'}, 201
        # Delete the user
        elif msg['type'] == 'deleteUser':
            user_db.deleteUser(msg['username'], msg['password'])
            return {'msg': 'Success!'}, 201

        # RECIPE
        # Add a custom recipe
        elif msg['type'] == 'addRecipe':
            recipe = msg['recipe']
            id = recipe_db.createRecipe(recipe)
            user_db.addRecipe(msg['username'], msg['password'],id)
            return {'msg': 'Success!'}, 201
        # Update a custom recipe
        elif msg['type'] == 'updateRecipe':
            recipe = msg['recipe']
            recipe_db.updateRecipe(recipe['id'], recipe)
            user_db.updateRecipe(recipe['id'], recipe)
            return {'msg': 'Success!'}, 201
        # Delete a custom recipe
        elif msg['type'] == 'deleteRecipe':
            recipe = msg['recipe']
            recipe_db.removeRecipe(recipe['id'])
            user_db.removeRecipe(msg['username'], msg['password'],recipe['id'])
            return {'msg': 'Success!'}, 201

        # GROCERY
        # Add a loose ingredient
        elif msg['type'] == 'addIndGrocery':
            username = msg['username']
            password = msg['password']
            section_id = msg['id']
            ingred = msg['ingredient']
            user_db.addIndIngred(username, password, section_id, ingred)
        # Add all ingredients of a recipe section
        elif msg['type'] == 'addRecGrocery':
            username = msg['username']
            password = msg['password']
            recipe_data = msg['recipe']
            user_db.addRecIngred(username, password, recipe_data)
        # Remove a loose ingredient
        elif msg['type'] == 'removeIndGrocery':
            username = msg['username']
            password = msg['password']
            section_id = msg['id']
            ingred = msg['ingredient']
            user_db.removeIndIngred(username, password, section_id, ingred)
        # Remove all ingredients of a recipe section
        elif msg['type'] == 'removeRecGrocery':
            username = msg['username']
            password = msg['password']
            section_id = msg['id']
            user_db.removeRecIngred(username, password, section_id)

    if request.method == 'GET':
        msg = request.args
        if 'type' in msg:
            # SEARCH & GET RECIPE
            # Get search result IDs from search phrase
            if msg['type'] == 'search':
                keyword = msg['keyword']
                recipes = recipe_db.searchRecipeByKeyword(keyword)
                recipes = {i: recipes[i] for i in range(len(recipes))}
                recipe_json = json.dumps(recipes, indent=2) 
                # print(recipe_json)
                response = Response(response=recipe_json, status=200, mimetype='application/json')
                print(response.response)
                return response
            # Get each recipe data based on recipe ID
            elif msg['type'] == 'fetchRecipe':
                recipe = recipe_db.fetchRecipeByID(msg['id'])
                data = {"recipe": recipe}
                data_json = json.dumps(data, indent=2)
                response = Response(response=data_json, status=200, mimetype='application/json')
                return response

            # TODO: USER delete these functions or update with new token system
            # Get username and password of user after login TODO: replace with Eamon's edit
            elif msg['type'] == 'login':
                username = msg['user']
                password = msg['pass']
                userInfo = user_db.request(username, password, ['Username', 'Password'])
                data = {"userInfo": userInfo}
                data_json = json.dumps(data, indent=2)
                response = Response(response=data_json, status=200, mimetype='application/json')
                return response
            # Get email of user
            elif msg['type'] == 'request':
                username = msg['user']
                password = msg['pass']
                elem = msg['elem']
                userInfo = user_db.request(username, password, ['Email'])
                print(username, password, elem)
                data = {"userInfo": userInfo}
                print(userInfo)
                data_json = json.dumps(data, indent=2)
                response = Response(response=data_json, status=200, mimetype='application/json')
                return response
            # Get <elem> columns from the user based on username + password
            elif msg['type'] == 'getUserInfo':
                username = msg['user']
                password = msg['pass']
                elem = msg['elem']
                if(elem == "keys"):
                    userInfo = user_db.request(username, password, ['keys'])
                    print(username, password, elem)
                    data = {"userInfo": userInfo}
                    print(userInfo)
                    data_json = json.dumps(data, indent=2)
                    response = Response(response=data_json, status=200, mimetype='application/json')
                return response
            # Get all recipes written by the user (list of recipe IDs)
            elif msg['type'] == 'getCustomizedRecipeIDs':
                username = msg['user']
                password = msg['pass']
                keys = ['Recipes']
                result = user_db.request(username, password, keys)
                recipes = pickle.loads(result[0])
                data = {"ID": recipes}
                data_json = json.dumps(data, indent=2)
                response = Response(response=data_json, status=200, mimetype='application/json')
                return response
            # Get the grocery list of the user
            elif msg['type'] == 'getGrocery':
                username = msg['user']
                password = msg['pass']
                keys = ['Shopping_list']
                result = user_db.request(username, password, keys)
                grocery = pickle.loads(result[0])
                data = {"grocery": grocery}
                data_json = json.dumps(data, indent=2)
                response = Response(response=data_json, status=200, mimetype='application/json')
                return response

    return render_template('home.html')

app.run(debug=True)

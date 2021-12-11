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
    print("Hello")
    print(request)
    if request.method == 'POST':
        msg = request.get_json()

        # USER
        # Register (create) the user
        # NOTE: This uses password, NOT the token.
        if msg['type'] == 'register':
            user_db.createUser(msg['username'], msg['password'], msg['email'], '', '')
            return {'msg': 'Success!'}, 201
          
        # Update the user
        if msg['type'] == 'updateUser':
            user_db.updateUser(msg['username'], msg['token'], msg['newInfo'])
            return {'msg': 'Success!'}, 201

        # Delete the user
        elif msg['type'] == 'deleteUser':
            user_db.deleteUser(msg['username'], msg['token'])
            return {'msg': 'Success!'}, 201
        # RECIPE
        # Add a custom recipe
        elif msg['type'] == 'addRecipe':
            recipe = msg['recipe']
            id = recipe_db.createRecipe(recipe)
            user_db.addRecipe(msg['username'], msg['token'],id)
            return {'msg': 'Success!'}, 201
        # Update a custom recipe
        elif msg['type'] == 'updateRecipe':
            recipe = msg['recipe']
            recipe_db.updateRecipe(recipe['id'], recipe)
            #user_db.updateRecipe(recipe['id'], recipe)
            return {'msg': 'Success!'}, 201
        # Delete a custom recipe
        elif msg['type'] == 'deleteRecipe':
            recipe = msg['recipe']
            recipe_db.removeRecipe(recipe['id'])
            user_db.removeRecipe(msg['username'], msg['token'],recipe['id'])
            return {'msg': 'Success!'}, 201
        
        # Save information upon logout
        elif msg['type'] == 'logout':
            username=msg['username']
            token=msg['token']
            grocery=msg['grocery']

            # Update grocery list when logging out
            user_db.addToList(username,token,grocery)
            return {'msg': 'Success!'}, 201

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
                # print(response.response)
                return response
            # Search for random recipes to populate the home page
            if msg['type'] == 'searchRandom':
                recipes = recipe_db.searchRandomRecipes()
                recipes = {i: recipes[i] for i in range(len(recipes))}
                recipe_json = json.dumps(recipes, indent=2) 
                # print(recipe_json)
                response = Response(response=recipe_json, status=200, mimetype='application/json')
                # print(response.response)
                return response
            # TODO: USER delete these functions or update with new token system
            # Get username and password of user after login NOTE: This uses password, NOT the token
            elif msg['type'] == 'login':
                username = msg['user']
                password = msg['pass']
                userInfo = user_db.login(username, password)
                data = {"userInfo": userInfo}
                data_json = json.dumps(data, indent=2)
                response = Response(response=data_json, status=200, mimetype='application/json')
                # print(response)
                return response
            # Get email of user
            elif msg['type'] == 'request':
                username = msg['user']
                token = msg['token']
                elem = msg['elem']
                userInfo = user_db.request(username, token, ['Email'])
                # print(username, token, elem)
                data = {"userInfo": userInfo}
                # print(userInfo)
                data_json = json.dumps(data, indent=2)
                response = Response(response=data_json, status=200, mimetype='application/json')
                return response
            # Get <elem> columns from the user based on username + password
            elif msg['type'] == 'getUserInfo':
                username = msg['user']
                token = msg['token']
                elem = msg['elem']
                if(elem == "keys"):
                    userInfo = user_db.request(username, token, ['keys'])
                    # print(username, token, elem)
                    data = {"userInfo": userInfo}
                    # print(userInfo)
                    data_json = json.dumps(data, indent=2)
                    response = Response(response=data_json, status=200, mimetype='application/json')
                return response

            # Get all recipes written by the user (list of recipe IDs)
            elif msg['type'] == 'getCustomizedRecipeIDs':
                username = msg['user']
                token = msg['token']
                keys = ['Recipes']
                result = user_db.request(username, token, keys)
                # print(result)
                recipesIds = pickle.loads(result[0])
                recipes = []
                for id in recipesIds:
                    singleRecipe = recipe_db.fetchRecipeByID(id)
                    recipes.append(singleRecipe)
                
                data = {"recipes": recipes}
                data_json = json.dumps(data, indent=2)
                response = Response(response=data_json, status=200, mimetype='application/json')
                return response

            # Get each recipe data based on recipe ID
            elif msg['type'] == 'fetchRecipe':
                recipe = recipe_db.fetchRecipeByID(msg['id'])
                data = {"recipe": recipe}
                data_json = json.dumps(data, indent=2)
                response = Response(response=data_json, status=200, mimetype='application/json')
                return response

            # Get the grocery list of the user
            elif msg['type'] == 'getGrocery':
                username = msg['user']
                token = msg['token']
                keys = ['Shopping_list']
                result = user_db.request(username, token, keys)
                grocery = pickle.loads(result[0])
                print("GROCERY ", grocery)
                data = {"grocery": grocery}
                if (grocery == None):
                    data = {"isEmpty": True}
                data_json = json.dumps(data, indent=2)
                print(data_json)
                response = Response(response=data_json, status=200, mimetype='application/json')
                return response
    return render_template('home.html')

if __name__ == '__main__':
    context = ('fullchain.pem', 'privkey.pem')
    app.run(debug=True, host='0.0.0.0', port=443, ssl_context=context)
    # app.run(debug=True) # local server

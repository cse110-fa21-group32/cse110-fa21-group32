# Flask app / server

# https://towardsdatascience.com/talking-to-python-from-javascript-flask-and-the-fetch-api-e0ef3573c451
# https://www.youtube.com/watch?v=AsoJL9GPi1k
# requirements: flask

from flask import Flask, jsonify, request, render_template, Response
from flask_cors import CORS
import json
import user_db
import recipe

app = Flask(__name__)
CORS(app)
user_db = user_db.User_DB()
recipe_db = recipe.Recipe_DB()

@app.route("/", methods=['GET', 'POST'])
def home_page():
    print(request)
    if request.method == 'POST':
        msg = request.get_json()
        if msg['type'] == 'register':
            user_db.createUser(msg['username'], msg['password'], msg['email'], '', '')
            return {'msg': 'Success!'}, 201
        if msg['type'] == 'delete':
            user_db.deleteUser(msg['username'], msg['password'])
            return {'msg': 'Success!'}, 201

    if request.method == 'GET':
        msg = request.args
        if msg['type'] == 'search':
            keyword = msg['keyword']
            recipes = recipe_db.searchRecipeByKeyword(keyword)
            recipes = {i: recipes[i] for i in range(len(recipes))}
            recipe_json = json.dumps(recipes, indent=2) 
            # print(recipe_json)
            response = Response(response=recipe_json, status=200, mimetype='application/json')
            print(response.response)
            return response
        elif msg['type'] == 'login':
            username = msg['user']
            password = msg['pass']
            userInfo = user_db.request(username, password, ['Username', 'Password'])
            data = {"userInfo": userInfo}
            data_json = json.dumps(data, indent=2)
            response = Response(response=data_json, status=200, mimetype='application/json')
            return response
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
        
    return {'msg':'test'}, 200

app.run(debug=True)
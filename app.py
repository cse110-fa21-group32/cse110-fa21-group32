# https://towardsdatascience.com/talking-to-python-from-javascript-flask-and-the-fetch-api-e0ef3573c451

from flask import Flask, jsonify, request, render_template
import user_db

app = Flask(__name__)
db = user_db.User_DB()

@app.route("/", methods=['GET', 'POST'])
def home_page():
    if request.method == 'POST':
        msg = request.get_json()
        if msg['type'] == 'register':
            db.createUser(msg['username'], msg['password'], msg['email'], '', '')

    return render_template('index.html')


app.run(debug=True)
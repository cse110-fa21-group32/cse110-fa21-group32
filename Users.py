# User DB - Backend

import json
import sqlite3
import pickle 
import socket

#Instance Variables: conn, cur


class User_DB:
    def __init__(self, db = 'users.db'):
        self.conn = sqlite3.connect('users.db') 
        self.cur = self.conn.cursor()
        # Create DB
        #cur.execute('DROP TABLE IF EXISTS Users')
        # TODO: DB Structure
        self.cur.execute('''
            CREATE TABLE IF NOT EXISTS Users( 
                Username STR PRIMARY KEY,
                Password STR,
                Email STR,
                fName STR,
                lName STR,
                Calendar BLOB,
                Shopping_list BLOB,
                Recipes BLOB,
                Reviews BLOB,
                Favorites BLOB
            )''')

    def __del__(self):
        self.conn.close()

    def createUser(self, username, password, email, fname, lname):
        '''
        Inputs: 
        - username: string
        - password: string - TODO: Check password strength in frontend/backend?
        - profile: json converted dict
        Output:
        - A boolean indicating operation result
        '''

        # pickle
        # profile_blob = pickle.dumps(profile) --> convert whatever to a byte string for storage in db
        # profile = pickle.loads(profile) --> convert byte string back to original object

        try:
            # Create users with username, password, email, first & last name. Other stuff will be NULL.
            self.cur.execute("INSERT INTO Users(Username, Password, Email, fName, lName) VALUES(?, ?, ?, ?, ?);", (username, password, email, fname, lname))
            self.conn.commit()
            return True
        except sqlite3.IntegrityError as er: # username is primary key so no duplicates allowed
            print('ERROR: User ' + username + ' already exists.')
            return False

    def request(self, username, password, key):
        '''
        TODO: Retrieve DB[key] 
        Inputs: 
        - username: string
        - password: string
        Output:
        - requested info or None if username/passwd don't match/exist
        '''

        self.cur.execute('SELECT ? FROM Users WHERE username = ? AND password = ?', (key, username, password))
        profile = self.cur.fetchall() # fetchall returns all matched records, i.e. correct username & password
        if len(profile) > 1: # since no duplicate allowed, should have only one profile
            print('ERROR: Duplicate users found.')
            return None
        elif len(profile) == 0: # user not found / passwd incorrect
            return None
        else:
            return profile[0]

new_db = User_DB()

#new_db.createUser("batman", "batman123", "batman@gmail.com", "Bat", "Man")
#print(new_db.request("batman", "batman123", "calendar"))

# http://HOST:PORT
# http://127.0.0.1:5500
HOST = 'localhost'  # Standard loopback interface address (localhost)
PORT = 5505        # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    conn, addr = s.accept()
    with conn:
        print('Connected by', addr)
        while True:
            data = conn.recv(1024)
            print(data)
            if not data:
                break
            #username, password, email, fname, lname = data.split()
            #new_db.createUser(username, password, email, fname, lname)
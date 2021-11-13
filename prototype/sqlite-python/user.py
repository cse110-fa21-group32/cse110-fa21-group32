# User DB - Backend

import json
import sqlite3
import pickle 

class User_DB:
    def __init__(self, db = 'users.db'):
        self.conn = sqlite3.connect('users.db')
        self.cur = conn.cursor()
        # Create DB
        #cur.execute('DROP TABLE IF EXISTS Users')
        # TODO: DB Structure
        cur.execute('''
            CREATE TABLE IF NOT EXISTS Users( 
                Username STR PRIMARY KEY,
                Password STR,
                Profile BLOB,  
            )''')

    def __del__(self):
        self.conn.close()

    def createUser(self, username, password, profile):
        '''
        Inputs: 
        - username: string
        - password: string - TODO: Check password strength in frontend/backend?
        - profile: json converted dict

        Output:
        - A boolean indicating operation result
        '''
        profile_blob = pickle.dumps(profile)
        try:
            cur.execute("INSERT INTO Users VALUES(?, ?, ?);", (username, password, profile))
            con.commit()
            return True
        except sqlite3.IntegrityError as er:
            print('ERROR: User ' + username + ' already exists.')
            return False

    def login(self, username, password):
        '''
        Inputs: 
        - username: string
        - password: string

        Output:
        - User profile or None in case of error/not found

        TODO: Send entire user profile or specific fields?
        '''

        cur.execute('SELECT Profile FROM Users WHERE username = ? AND password = ?', username, password)
        profile = cur.fetchall()
        if len(profile) > 1:
            print('ERROR: Duplicate users found.')
            return None
        elif len(profile) == 0:
            return None
        else:
            return profile[0]



# User DB - Backend

import json
import sqlite3
import pickle 
import socket
import hashlib
from threading import Lock
#Instance Variables: conn, cur

class User_DB:
    def __init__(self, db = 'users.db'):
        self.lock = Lock()
        self.conn = sqlite3.connect('users.db', check_same_thread=False) 
        self.cur = self.conn.cursor()
        # Create DB
        #cur.execute('DROP TABLE IF EXISTS Users')
        # TODO: DB Structure
        self.cur.execute('''
            CREATE TABLE IF NOT EXISTS Users( 
                Username STR PRIMARY KEY,
                Password STR,
                Token STR,
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
        self.lock.acquire(True)
        print("Creating User...")
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
            salt = "group32" #This section is responsible for token generation through hashing.
            toHash = username+password+salt #Stick everything together.
            token = hashlib.sha256(toHash.encode()).hexdigest()
            empty = pickle.dumps([])
            self.cur.execute("INSERT INTO Users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (username, password, token, email, fname, lname, empty, empty, empty, empty, empty))
            self.conn.commit()
            self.lock.release()
            return True
        except sqlite3.IntegrityError as er: # username is primary key so no duplicates allowed
            print('ERROR: User ' + username + ' already exists.')
            self.lock.release()
            return False

    def request(self, username, token, keys):
        '''
        TODO: Retrieve DB[key] 
        Inputs: 
        - username: string
        - token: string
        - keys: list of keys to query
        Output:
        - requested info or None if username/token don't match/exist
        '''
        self.lock.acquire(True)
        self.cur.execute('SELECT %s FROM Users WHERE Username = ? AND Token = ?' % (', '.join(keys)), (username, token))
        profile = self.cur.fetchall() # fetchall returns all matched records, i.e. correct username & token
        if len(profile) > 1: # since no duplicate allowed, should have only one profile
            print('ERROR: Duplicate users found.')
            self.lock.release()
            return None
        elif len(profile) == 0: # user not found / token incorrect
            self.lock.release()
            return None
        else:
            self.lock.release()
            return profile[0]

    def login(self, username, password):
        self.lock.acquire(True)
        self.cur.execute('SELECT Password, Token FROM Users WHERE Username = "%s"' % (username))
        profile = self.cur.fetchall()
        print(profile)
        dbPassword = profile[0][0] #database password

        if(str(password) == str(dbPassword)): #Enforce Consistent Type Checking (String VS Int)
            self.lock.release()
            return profile[0][1] #database token
        else:
            print("User does not exist in database!")
            self.lock.release()
            return None


    # def request2(self, username, password, key):
    #     '''
    #     TODO: Retrieve DB[key] 
    #     Inputs: 
    #     - username: string
    #     - password: string
    #     Output:
    #     - requested info or None if username/passwd don't match/exist
    #     '''
    #     print(username, password)
    #     self.cur.execute('SELECT * FROM Users WHERE username = ? AND password = ?', (username, password))
    #     profile = self.cur.fetchall() # fetchall returns all matched records, i.e. correct username & password
    #     if len(profile) > 1: # since no duplicate allowed, should have only one profile
    #         print('ERROR: Duplicate users found.')
    #         return None
    #     elif len(profile) == 0: # user not found / passwd incorrect
    #         return None
    #     else:
    #         return profile[0]

    # TODO: Finalize CRUD functions

    def updateUser(self, username, token, updateVals):
        #Check to see if the sought updated columns exist in the database at all
        query = 'UPDATE Users SET ' + ', '.join(['%s = ?' % (p[0]) for p in updateVals.items()]) + ' WHERE username = ? AND Token = ?'
        self.cur.execute(query, [p[1] for p in updateVals.items()] + [username, token])
        self.conn.commit()
    
    def deleteUser(self,username,token):
        self.lock.acquire(True)
        # Updates users with username, password, email, first & last name. Other stuff will be NULL.
        self.cur.execute("DELETE FROM Users WHERE username = ? AND token = ? ", (username, token))
        self.conn.commit()
        self.lock.release()
        return True
    
    def addRecipe(self, username, token, id):
        self.lock.acquire(True)
        self.cur.execute('SELECT Recipes FROM Users WHERE Username = ? AND Token = ?', (username, token))
        result = self.cur.fetchall()
        if len(result) == 0: 
            self.lock.release()
            return # no user found
        if result[0][0] is None : 
            recipes = pickle.dumps([id])
        else:
            recipes = pickle.loads(result[0][0]) # TODO: Integrity check
            if id not in recipes: recipes.append(id)
            recipes = pickle.dumps(recipes)
        self.updateUser(username, token, {'Recipes': recipes})
        self.conn.commit()
        self.lock.release()

    def removeRecipe(self, username, token, id):
        self.lock.acquire(True)
        self.cur.execute('SELECT Recipes FROM Users WHERE Username = ? AND Token = ?', (username, token))
        result = self.cur.fetchall()
        if len(result) == 0: 
            self.lock.release()
            return # no user found
        if result[0][0] is None: 
            recipes = pickle.dumps([])
        else:
            try:
                recipes = pickle.loads(result[0][0]) 
                recipes.remove(id)
            except ValueError:
                pass # not exists
            finally:
                recipes = pickle.dumps(recipes)
        self.updateUser(username, token, {'Recipes': recipes})
        self.conn.commit()
        self.lock.release()
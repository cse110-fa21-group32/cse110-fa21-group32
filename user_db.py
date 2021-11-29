# User DB - Backend

import json
import sqlite3
import pickle 
import socket

#Instance Variables: conn, cur

class User_DB:
    def __init__(self, db = 'users.db'):
        self.conn = sqlite3.connect('users.db', check_same_thread=False) 
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
            self.cur.execute("INSERT INTO Users(Username, Password, Email, fName, lName) VALUES(?, ?, ?, ?, ?)", (username, password, email, fname, lname))
            self.conn.commit()
            return True
        except sqlite3.IntegrityError as er: # username is primary key so no duplicates allowed
            print('ERROR: User ' + username + ' already exists.')
            return False

    def request(self, username, password, keys):
        '''
        TODO: Retrieve DB[key] 
        Inputs: 
        - username: string
        - password: string
        - keys: list of keys to query
        Output:
        - requested info or None if username/passwd don't match/exist
        '''
        self.cur.execute('SELECT %s FROM Users WHERE Username = ? AND Password = ?' % (', '.join(keys)), (username, password))
        profile = self.cur.fetchall() # fetchall returns all matched records, i.e. correct username & password
        if len(profile) > 1: # since no duplicate allowed, should have only one profile
            print('ERROR: Duplicate users found.')
            return None
        elif len(profile) == 0: # user not found / passwd incorrect
            return None
        else:
            return profile[0]

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

    def updateUser(self, username, password, updateVals):
        #Check to see if the sought updated columns exist in the database at all
        query = 'UPDATE Users SET ' + ', '.join(['%s = ?' % (p[0]) for p in updateVals.items()]) + ' WHERE username = ? AND password = ?'
        self.cur.execute(query, [p[1] for p in updateVals.items()] + [username, password])
        self.conn.commit()
    
    def deleteUser(self,username,password):
        # Updates users with username, password, email, first & last name. Other stuff will be NULL.
        self.cur.execute("DELETE FROM Users WHERE username = ? AND password = ? ", (username, password))
        self.conn.commit()
        return True
    
    def addRecipe(self, username, password, id):
        self.cur.execute('SELECT Recipes FROM Users WHERE Username = ? AND Password = ?', (username, password))
        result = self.cur.fetchall()
        if len(result) == 0: return # no user found
        if result[0][0] is None : 
            recipes = pickle.dumps([id])
        else:
            recipes = pickle.loads(result[0][0]) # TODO: Integrity check
            if id not in recipes: recipes.append(id)
            recipes = pickle.dumps(recipes)
        self.updateUser(username, password, {'Recipes': recipes})
        self.conn.commit()

    def removeRecipe(self, username, password, id):
        self.cur.execute('SELECT Recipes FROM Users WHERE Username = ? AND Password = ?', (username, password))
        result = self.cur.fetchall()
        if len(result) == 0: return # no user found
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
        self.updateUser(username, password, {'Recipes': recipes})
        self.conn.commit()


if __name__ == '__main__':
    new_db = User_DB()
    recipes = """(lp0
I123456
aI4567
aI329012
a."""
    #print(pickle.loads(recipes))
    new_db.createUser("MartinF123", "456", "mare@gmail.com", "Martin", "Flores")
#     shit = pickle.dumps([123456])
#    # print(pickle.loads(shit))
    new_db.addRecipe('MartinF123','456',123456)
    new_db.addRecipe('MartinF123','456',4567)
    new_db.addRecipe('MartinF123','456',329012)
    
    new_db.removeRecipe('MartinF123','456',123456)
    new_db.removeRecipe('MartinF123','456',4567)
    
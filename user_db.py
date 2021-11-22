# User DB - Backend
# requirement: sqlite3

import json
import sqlite3
import pickle 

class User_DB:
    def __init__(self, db = 'users.db'):
        self.columns = ["Username", "Password", "Email", "fname", "lname", "Calendar", 
                       "Shopping_List", "Recipes", "Reviews", "Favorites"]
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


    # TODO: Finalize CRUD functions
    def updateUser(self, username, password, updateVals): #TODO: query update isnt working correctly
        
        #Check to see if the sought updated columns exist in the database at all
        
        for key in updateVals:            
            if key not in self.columns:
                print("Selected Updated Column Does Not Exist in DataBase")
                return False

        #Ensure User Exists in DB
        
        self.cur.execute('SELECT * FROM Users WHERE username = ? AND password = ?', (username, password))
        matched = self.cur.fetchall()
        if len(matched) == 0:
            print("User Does not Exist")
            raise sqlite3.IntegrityError
            
        #User Exists, Columns Exist, Proceed and Update Columns.
        
        for pair in updateVals.items():
            try:
                query = "UPDATE Users SET {} = {} WHERE username = {} AND password = {}".format(pair[0], pair[1], username, password)
                self.cur.execute('UPDATE Users SET Email = ? WHERE username = ? AND password = ?', (pair[1], username, password))
                self.conn.commit()
            except sqlite3.IntegrityError as er:
                print("Update Value is a duplicate")
                return False


    def deleteUser(self,username,password):

            # Updates users with username, password, email, first & last name. Other stuff will be NULL.
        self.cur.execute("DELETE FROM Users WHERE username = ? AND password = ? ", (username, password))
        self.conn.commit()
        return True
        
        

    

new_db = User_DB()
new_db.createUser("eamon", "hithere", "eamon@gmail.com", "eamon", "aalipour")
new_db.deleteUser("eamon", "hithere")


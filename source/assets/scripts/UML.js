function getAllRecipes() // A function used to get all the recipes
	{
		return recipes; 
	}
function getSearchResults() // A function used to get the search results 
	{
		return results;
	}
function getRecipe() // A function used to get a singula specific recipe
	{
		return recipe;
	}
function getUser() // A function to get the user 
	{
		return user;
	}
function getUserProfile() // A function to get the user profile 
	{
		return profile; 
	}
function changePassword(email,newPassword,callback) // A function to change the users password gotten from https://auth0.com/docs/connections/database/custom-db/templates/change-password
	{
  	const bcrypt = require('bcrypt'); // Using the bcrypt npm package which is used for working securey with passwords
  	const MongoClient = require('mongodb@3.1.4').MongoClient; // Initialize mongo client which is another package in js that connects to MonoDB database to store a hashed version of our password for maximum security
  	const client = new MongoClient('mongodb://user:pass@mymongoserver.com'); // Connect the client to the user

  	client.connect(function (err) {
    	if (err) return callback(err); // if there is an error with the connection, use a callback function with an error as an input

   	const db = client.db('db-name'); // get the name
    	const users = db.collection('users'); // get the user 

    	bcrypt.hash(newPassword, 10, function (err, hash) { // use bcrypt to hash the new password
      	if (err) { // if an error flag is triggered close the connection and once again use a callback function with an error as an input
        	client.close();
        	return callback(err);
      	}

      	users.update({ email: email }, { $set: { password: hash } }, function (err, count) { // update the users email and password
        	client.close(); // close the connection with the client
        	if (err) return callback(err); // if error flag is received, callback function is called with error input
        	callback(null, count > 0); // callback function called with a null and count>0 
      	});
    	});
  	});
}

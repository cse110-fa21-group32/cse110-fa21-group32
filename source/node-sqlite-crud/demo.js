const sqlite3 = require('sqlite3');


let db = new sqlite3.Database("./user.sqlite3", (err) => {
    if (err) { 
        console.log('Error when creating the database', err) 
    } else { 
        console.log('Database created!') 
        /* Put code to create table(s) here */
        createTable()
    } 
})

//creating the table
const createTable = () => {
    console.log("create database table contacts");
    db.run("CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)",  insertData);
}

//inserting data function
const insertData = () =>{
    console.log("Insert data")
    db.run('INSERT INTO contacts (name) VALUES (?)', ["contact 001"]);
}

//reading from DB
read = () => {
    console.log("Read data from contacts");
    db.all("SELECT rowid AS id, name FROM contacts", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.id + ": " + row.name);
        });
    });
}

//closing db 
//db.close();
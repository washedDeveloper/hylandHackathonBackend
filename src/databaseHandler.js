const sqlite3 = require('sqlite3').verbose();
 
// Open the database
const db = new sqlite3.Database('./db/'); // TODO: ADD FOLDER 'DB' AND ADD DATABASE FILE IN IT

function getUserData(id) {
    const sql = `SELECT UserID FROM USERS WHERE UserID = ${id}`;
}

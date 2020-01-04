const sqlite3 = require('sqlite3').verbose();
const uuid = require("uuid/v4");
// Open the database
const db = new sqlite3.Database('C:/Users/DINO BLOOD BATHS/Desktop/hackathonBackend/src/db/database.db', (err) => {
    if(err){
        console.log(err);
    }
});

exports.getUserData = async (id) => {
    return new Promise( (resolve, reject) => {
        const get = `SELECT UserID,Username,Password,Name,Email,SchoolID FROM USERS WHERE UserID = '${id}'`;
        db.all(get,(err,rows)=>{
            if(err){
                return console.error(err);
            }
            //console.log(rows);
            resolve(rows);
        });
    });
}

exports.createUser = (un, pw, name, em,schoolID)=>{
    const id = uuid();
    const email = encodeURI(em);
    const add = `INSERT INTO USERS (UserID, UserName, Password, Name, Email, SchoolID) VALUES ('${id}', '${un}', '${pw}', '${name}', '${email}', '${schoolID}')`;
    db.run(add, [], (err) => {
        if(err){
            console.log(err.message)
        }

        console.log("New User Created!");
    });
}


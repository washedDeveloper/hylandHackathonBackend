const sqlite3 = require('sqlite3').verbose();
const uuid = require("uuid/v4");
// Open the database
const db = new sqlite3.Database('C:/Users/pbrop/Desktop/backend/src/db/database.db', (err) => {
    if(err){
        console.log(err);
    }
});

exports.getUserData = (id) => {
    const get = `SELECT UserID,Username,Password,Name,Email,SchoolID FROM USERS WHERE UserID = '${id}'`;
    db.all(get,(err,rows)=>{
        if(err){
            return console.error(err);
        }
        rows.forEach(row => {
            console.log(row);
        });
    })
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

exports.login = (un,pw) => {
    return new Promise( (resolve, reject) => {
        const auth = `SELECT Username, Password FROM USERS WHERE Username = '${un}' AND Password = '${pw}'`
        db.get(auth, [], (err,row)=>{
            if (err){
                console.error(err);
                reject()
            }
            if(row){
                resolve()
            }else{
                reject()
            }
        })
    })
}


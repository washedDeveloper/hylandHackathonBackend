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
                reject(err);
            }
            //console.log(rows);
            resolve(rows[0]);
        });
    });
}

exports.getUserSchool = (userSchoolID) => {
    const get = `SELECT Name,Address FROM SCHOOLS WHERE SchoolID = '${userSchoolID}'`;
    db.get(get, [], (err, row) => {
        if (err) return console.error(err);

        console.log(row);
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

exports.createSchool = (id, name, address) => {
    const update = `UPDATE SCHOOLS SET Name = '${name}', Address = '${address}' WHERE SchoolID = '${id}'`;

    db.run(update, [], err => {
        if (err) console.error(err.message);

        console.log("New School Added");
    });

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


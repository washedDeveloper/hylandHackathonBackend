const sqlite3 = require('sqlite3').verbose();
const uuid = require("uuid/v4");
// Open the database
const db = new sqlite3.Database('C:/Users/pbrop/Desktop/backend/src/db/database.db', (err) => {
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
    return new Promise( (resolve, reject) => {
        const get = `SELECT SchoolID, Name, Address FROM SCHOOLS WHERE SchoolID = ${userSchoolID}`;
        db.get(get, [], (err, row) => {
            if (err) reject(err);
            
            resolve(row);
        });
    });
}

exports.getUserSchedule = (id) => {
    return new Promise( (resolve, reject) => {
        const get = `SELECT ClassID FROM USERSCHEDULE WHERE UserID = '${id}'`;
        db.all(get, (err, rows) => {
            if (err) reject(err);

            resolve(rows);
        });
    })
}

exports.getClassData = (classID) => {
    return new Promise( (resolve, reject) => {
        const get = `SELECT ClassID, ClassName, Period, Teacher FROM CLASSROOM WHERE SchoolID = ${classID}`;
        db.get(get, [], (err, row) => {
            if (err) reject(err);
            
            resolve(row);
        });
    });
}

exports.createUser = (un, pw, name, em, schoolID, schoolName, schoolAddress)=>{
    const id = uuid();
    console.log(id); // DELETE LATER
    const email = encodeURI(em);
    const add = `INSERT INTO USERS (UserID, UserName, Password, Name, Email, SchoolID) VALUES ('${id}', '${un}', '${pw}', '${name}', '${email}', '${schoolID}')`;
    db.run(add, [], (err) => {
        if(err){
            console.log(err.message)
        }

        console.log("New User Created!");
    });

    const schoolAdd = `INSERT INTO SCHOOLS (SchoolID, Name, Address) VALUES ('${schoolID}', '${schoolName}', '${schoolAddress}')`;
    db.run(schoolAdd, [], err => {
        if (err) console.error(err);

        console.log("School added to database")
    });
}

exports.createClass = (schoolID, className, period, teacher) => {
    const id = uuid();
    const add = `INSERT INTO CLASSROOM (ClassID, SchoolID, ClassName, Period, Teacher) VALUES ('${id},' '${schoolID},' '${className},' '${period},' '${teacher}')`;
    db.run(add, [], err => {
        if (err) console.error(err);

        console.log("Classroom added to database")
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
    });
}

exports.getAssignments = (classID) => {
    return new Promise((resolve, reject) => {
        const assignments = `SELECT AssignmentID, ClassID, UserCreatedID, DateCreated, DueDate, Title, Description FROM ASSIGNMENTS WHERE ClassID = '${classID}'`;
        db.all(assignments,(err, row) => {
            if(err){
                console.error(err);
                reject();
            }
            if(row){
                resolve(row)
            }else{
                reject()
            }
        })
    })
}


exports.createAssignment = (classID, userID) => {
    return new Promise((resolve, reject) => {
        const assignmentId = uuid();
        const currentDate = Date.now()
        resolve(currentDate)
        const add = `INSERT INTO ASSIGNMENTS (assignmentId, '${classID}', '${userID}', DateCreated, DueDate, Title, Description)`
    })
}

exports.addScheduledClass = (classID, userID) => {
    const add = `INSERT INTO USERSCHEDULE (UserID, ClassID) VALUES ('${classID}', '${userID}')`;
    db.run(add, [], err => {
        if (err) console.error(err);

        console.log("Class scheduled for user " + userID);
    });
}
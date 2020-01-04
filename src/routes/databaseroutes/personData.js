const routes = require('express').Router();

const dbhandler = require("../../databaseHandler");
routes.get('/:userID', async (req, res) => {

  dbhandler.getUserData(req.params.userID).then(userData => {

    const userDetails = {
      username: userData.Username,
      name: userData.Name,
      email: userData.Email
    }
    
    const schoolPromise = dbhandler.getUserSchool(userData.SchoolID);
    const schedulePromise = dbhandler.getUserSchedule(req.params.userID);
    
    Promise.all([schoolPromise, schedulePromise]).then( values => {
      [schoolData, scheduleData] = values;

      // handle school data
      userDetails.School = {
        name: schoolData.Name,
        address: schoolData.Address
      }

      // handle schdule data
      const classesArr = [];
      const classPromises = [];

      for (let row of scheduleData) {
        const classId = row.ClassID;
        classPromises.push(dbhandler.getClassData(classId));
        classPromises.push(dbhandler.getAssignments(classId));
      }

      Promise.all(classPromises).then( values => {
        for (let i = 0; i < values.length - 1; i += 2) {
          classesArr.push({
            classID: values[i].ClassID,
            className: values[i].ClassName,
            assignments: values[i + 1]
          });
        }

        userDetails.Classes = classesArr;

        dbhandler.getUserNotes(req.params.userID).then(notes => {
          userDetails.Notes = notes;
          
          // Send user's information to client
          res.status(200).send({ userDetails });
        }).catch(err => {
          console.error(err);
        });
      }).catch(err => {
        console.error(err);
      });
    }).catch(err => {
      console.error(err);
    });
  }).catch( err => {
    console.error(err);
  });
});

module.exports = routes;
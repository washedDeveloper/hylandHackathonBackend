const routes = require('express').Router();

const dbhandler = require("../../databaseHandler");
routes.get('/:userID', async (req, res) => {

  dbhandler.getUserData(req.params.userID).then( userData => {

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
      console.log("AFTER SCHOOL:")
      console.log(userDetails);

      // handle schdule data
      const classesArr = [];
      const classPromises = [];

      console.log("SCHEDULE DATA:");
      console.log(scheduleData);
      for (let row of scheduleData) {
        classPromises.push(dbhandler.getClassData(row.ClassID));
        // TODO: IMPLEMENT BELOW
        classPromises.push(dbhandler.getAssignments(row.ClassID));
      }

      Promise.all(classPromises).then( values => {
        for (let i = 0; i < values.length - 1; i += 2) {
          classesArr.push({
            classID: values[i].ClassID,
            className: values[i].ClassName,
            assignments: values[i + 1]
          });
        }
        console.log("AFTER CLASSES");
        console.log(userDetails);
      }).catch(err => {
        console.error(err);
      });

      userDetails.Classes = classesArr;
    }).catch(err => {
      console.error(err);
    });

    console.log(userDetails);
    res.status(200).send({ userDetails });

  }).catch( err => {
    console.error(err);
  });
});

module.exports = routes;
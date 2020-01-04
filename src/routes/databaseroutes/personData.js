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

      // handle schdule data
      const classesArr = [];
      const classPromises = [];

      for (let row of scheduleData) {
        classPromises.push(dbhandler.getClassData(row.ClassID));
      }

      Promise.all(classPromises).then( values => {
        for (let i of values) {
          classesArr.push({
            classID: i.ClassID,
            className: i.ClassName
          });
        }
      });

      userDetails.Classes = classesArr;
    });

    console.log(userDetails);
    res.status(200).send({ userDetails });

  }).catch( err => {
    console.error(err);
  });
});

module.exports = routes;
const routes = require('express').Router();

const dbhandler = require("../../databaseHandler");
routes.get('/:userID', async (req, res) => {

  dbhandler.getUserData(req.params.userID).then( userData => {

    const userDetails = {
      Username: userData.Username,
      Name: userData.Name,
      Email: userData.Email
    }

    dbhandler.getUserSchool(userData.SchoolID).then( schoolData => {
      userDetails.School = {
        Name: schoolData.Name,
        Address: schoolData.Address
      }
    }).catch( err => {
      console.error(err);
    });

    console.log(userDetails);
    res.status(200).send({ userData });

  }).catch( err => {
    console.error(err);
  });
});

module.exports = routes;
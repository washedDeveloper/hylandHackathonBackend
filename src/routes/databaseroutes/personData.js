const routes = require('express').Router();

const dbhandler = require("../../databaseHandler");
routes.get('/:userID', async (req, res) => {

  dbhandler.getUserData(req.params.userID).then( userData => {

    const userDetails = {
      username: userData.Username,
      name: userData.Name,
      email: userData.Email
    }

    //dbhandler.getUserSchool(userData.SchoolID);

    console.log(userDetails);
    res.status(200).send({ userDetails });

  }).catch( err => {
    console.error(err);
  });
});

module.exports = routes;
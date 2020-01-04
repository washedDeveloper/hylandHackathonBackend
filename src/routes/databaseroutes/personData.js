const routes = require('express').Router();

const dbhandler = require("../../databaseHandler");
routes.get('/:userID', async (req, res) => {
  dbhandler.getUserData(req.params.userID).then( userData => {
    const userDetails = {
      username: userData.Username,
      name: userData.Name,
      email: userData.Email
    }
    console.log(userDetails);
    res.send("Hello")
  }).catch( err => {
    console.error(err);
  });
});

module.exports = routes;
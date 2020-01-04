const routes = require('express').Router();
const dbHandler = require("../../databaseHandler");
routes.post('/', (req, res) => {
  const userData = req.body
  console.log(userData);
  dbHandler.createUser(userData.Username, userData.Password, userData.Name, userData.Email, userData.SchoolID, userData.SchoolName, userData.SchoolAddress);
  res.json({message : "You made it"});
});

module.exports = routes;
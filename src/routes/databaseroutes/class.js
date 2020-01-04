const routes = require('express').Router();
const dbHandler = require("../../databaseHandler");

routes.post('/', (req, res) => {
  const userData = req.body;
  console.log(userData);
  
  dbHandler.createClass(userData.SchoolID, userData.ClassName, userData.Period, userData.Teacher);
  res.json({message : "You made it"});
});

module.exports = routes;
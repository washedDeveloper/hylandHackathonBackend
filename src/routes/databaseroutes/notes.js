const routes = require('express').Router();
const dbHandler = require("../../databaseHandler");

routes.post('/', (req, res) => {
  const userData = req.body;
  console.log(userData);
  
  dbHandler.addNote(userData.UserID, userData.Content, userData.Title);
  res.status(200).json({message : "Note sent to database"});
});

module.exports = routes;
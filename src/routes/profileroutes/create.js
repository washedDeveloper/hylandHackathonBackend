const routes = require('express').Router();
const dbHandler = require("../../databaseHandler");
routes.get('/', (req, res) => {
  dbHandler.createUser("dumby", "thicc", "dumby thicc", "email@gmail.com", "123");
  res.json({message : "You made it"});
});

module.exports = routes;
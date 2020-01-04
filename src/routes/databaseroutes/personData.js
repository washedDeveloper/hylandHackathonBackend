const routes = require('express').Router();

const dbhandler = require("../../databaseHandler");
routes.get('/:userID', (req, res) => {
  dbhandler.getUserData(req.params.userID);
  res.status(200).json({ message: 'Connected to database: ready to send user information once we implement this dang thing' });


});

module.exports = routes;
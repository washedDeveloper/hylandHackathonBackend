const routes = require('express').Router();

const dbhandler = require("../../databaseHandler");
routes.get('/:userID', async (req, res) => {
  const data = dbhandler.getUserData(req.params.userID).then( userData => {
    console.log("hi");
    console.log(data2);
  });
  console.log(data);
  res.status(200).json({ message: 'Connected to database: ready to send user information once we implement this dang thing' });
});

module.exports = routes;
const routes = require('express').Router();
const dbhandler = require("../../databaseHandler")
routes.post('/', async (req, res) => {
  const loginData = req.body
  dbhandler.login(loginData.Username, loginData.Password).then(() => {
    res.status(200).json({ message: 'Login Successful' });
    console.log("Login Successful")
  }).catch(() => {
    res.status(401).json({ message : 'Login Failed'});
  })

});

module.exports = routes;
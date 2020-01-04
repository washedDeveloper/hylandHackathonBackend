const routes = require('express').Router();

routes.get('/:userID', (req, res) => {
  res.status(200).json({ message: 'Connected to database: ready to send user information once we implement this dang thing' });
});

module.exports = routes;
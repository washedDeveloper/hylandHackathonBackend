const routes = require('express').Router();

routes.get('/:userID', (req, res) => {
  res.status(200).json({ message: `Ready to send info for user ${req.params.userID}` });
});

module.exports = routes;
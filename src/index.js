const express = require("express");
const app = express();

// Main routes file
const routes = require("./routes/index");

// Profile routes
const login = require("./routes/profileroutes/login");
const create = require("./routes/profileroutes/create");

// Data routes
const personData = require("./routes/databaseroutes/personData");

// Default route
app.use("/", routes);

// Login route
app.use("/login", login);

// Create account route
app.use("/create", create);

// Get personal data route
app.use("/person-data", personData);

app.listen(3000);
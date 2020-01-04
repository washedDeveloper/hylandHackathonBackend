const express = require("express");
const app = express();

// Main routes file
const routes = require("./routes/index");

// Profile routes
const login = require("./routes/profileroutes/login");
const create = require("./routes/profileroutes/create");

// Default route
app.use("/", routes);

// Login route
app.use("/login", login);

// Create account route
app.use("/create", create);

app.listen(3000);
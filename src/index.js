const express = require("express");
const app = express();

// Database handling file
const db = require("./databaseHandler");

// Main routes file
const routes = require("./routes/index");

// Profile routes
const login = require("./routes/profileroutes/login");
const create = require("./routes/profileroutes/create");

// Data routes
const personData = require("./routes/databaseroutes/personData");
const classAssignments = require("./routes/databaseroutes/assignments");
const userSchedule = require("./routes/databaseroutes/schedule");
const classes = require("./routes/databaseroutes/class");

const notes = require("./routes/databaseroutes/notes");
const link = require("./routes/databaseroutes/links");

const messages = require("./routes/databaseroutes/messages");


//Middleware Body Parser
app.use(express.json());

// Default route
app.use("/", routes);

// Login route
app.use("/login", login);

// Create account route
app.use("/create", create);

// Get personal data route
app.use("/user", personData);

// Get assignments by class
app.use("/assignments", classAssignments);

// Route to add/update user schedule
app.use("/schedule", userSchedule);

// Route to add classes
app.use("/class", classes);

// Route to add notes
app.use("/note", notes);

//Route to add link
app.use("/link", link);

//Route to get messages
app.use("/messages", messages);

app.listen(3000);
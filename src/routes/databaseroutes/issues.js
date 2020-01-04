const routes = require('express').Router();
const dbhandler = require("../../databaseHandler");

routes.get("/:issueID", (req ,res) => {
    .then( () => {
        res.status(200).json({message : "Successfully Created URL"});
    }).catch( () => {
        res.status(404).json({message : "Failed To Create URL"});
    })
});

routes.post("/createIssue", (req, res) => {
    dbhandler.createIssue(req.body.ClassID, req.body.UserID, req.body.Title, req.body.Description);
    res.status(200).json({ message: "Issue sent to database" });
});
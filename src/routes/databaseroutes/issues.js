const routes = require('express').Router();
const dbhandler = require("../../databaseHandler");

routes.get("/:issueID", (req ,res) => {
    dbhandler.getIssuePost.then( () => {
        res.status(200).json({message : "Successfully found issue at ID"});
    }).catch( () => {
        res.status(404).json({message : "Failed to find issue at ID"});
    })
});

routes.post("/createIssue", (req, res) => {
    dbhandler.createIssue(req.body.ClassID, req.body.UserID, req.body.Title, req.body.Description);
    res.status(200).json({ message: "Issue sent to database" });
});
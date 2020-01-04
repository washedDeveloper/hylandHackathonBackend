const routes = require('express').Router();

const dbhandler = require("../../databaseHandler");

routes.get("/:classID", (req,res) =>{
    dbhandler.getAssignments(req.params.classID).then((assignments) =>{
        console.log(assignments);
        res.status(200).json({assignments});
    }).catch(()=>{
        res.status(404).json({message : "Could Not Retrive Assignments"})
    })
})

routes.post("/:classID", (req, res) => {
    dbhandler.createAssignment(req.params.ClassID, req.body.UserID, req.body.Title, req.body.Description).then((result) => {
        res.status(200).json({message : "Assignment Creation Was Successful"});
        console.log(result);
    }).catch(()=>{
        res.status(404).json({ message : "Assignment Creation Failed" });
        console.log("Assignment Creation Failed");
    })
})

routes.delete("/:classID", (req, res) => {
    dbhandler.removeAssignment(req.params.classID, req.body.AssignmentID).then(()=>{
        res.status(200).json({message : "Successfully Removed Assignment"});
    }).catch(()=>{
        res.status(404).json({message : "Failed to Remove Assignment"});
    });
})

module.exports = routes
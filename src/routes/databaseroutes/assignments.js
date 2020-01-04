const routes = require('express').Router();

const dbhandler = require("../../databaseHandler");

routes.get("/:classID", (req,res) =>{
    dbhandler.getAssignments(req.params.classID).then((assignments) =>{
        const assignmentDetails = {
            AssignmentID : assignments.AssignmentID,
            ClassID : assignments.ClassID,
            UserCreatedID : assignments.UserCreatedID,
            DateCreated : assignments.DateCreated,
            DueDate : assignments.DueDate,
            Title : assignments.Title,
            Description : assignments.Description
        }

        console.log(assignmentDetails);
        res.status(200).json(assignmentDetails);
    }).catch(()=>{
        res.status(404).json({message : "Could Not Retrive Assignments"})
    })
})

routes.post("/:classID", (req, res) => {
    dbhandler.createAssignment(req.params.classID, req.body.userID).then((date) => {
        console.log(date);
    })
})

module.exports = routes
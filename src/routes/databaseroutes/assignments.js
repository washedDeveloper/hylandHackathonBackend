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
    dbhandler.createAssignment(req.params.classID, req.body.userID).then((date) => {
        console.log(date);
    })
})

module.exports = routes
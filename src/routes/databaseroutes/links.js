const routes = require('express').Router();
const dbhandler = require("../../databaseHandler");

routes.post("/:classID", (req,res)=>{
    dbhandler.createLink(req.body.UserID, req.params.classID, req.body.Name, req.body.Url).then( () => {
        res.status(200).json({message : "Successfully Created URL"});
    }).catch( () => {
        res.status(404).json({message : "Failed To Create URL"});
    })
});
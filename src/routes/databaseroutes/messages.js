const routes = require('express').Router();
const dbhandler = require("../../databaseHandler");

routes.get("/:classID", (req, res) => {
    dbhandler.getMessages(req.params.classID, req.body.UserID).then((messages) =>{
        for (let m of messages){
            m.isUser = m.UserID === req.body.UserID
        }
        res.status(200).json(messages);
    }).catch(() => {
        res.status(404).json({message : "Failed to Retrive Messages"})
    })
})

routes.post("/:classID", (req, res) => {
    dbhandler.createMessage(req.params.classID, req.body.UserID, req.body.Message).then(()=>{
        console.log("Success")
        res.status(200).json({message : "Successfully Created Message"})
    }).catch(()=>{
        console.log("Failed")
        res.status(404).json({message : "Failed to Create Message"})
    })
})

module.exports = routes;
const express = require('express');
const issueController = require("../controllers/issueController")

const issueRouter = express.Router();
// mainRouter.use(issueRouter);

issueRouter.post("/issue/create", issueController.createIssue);
issueRouter.get("/issue/all", issueController.getAllIssues);
issueRouter.get("/issue/:id", issueController.getIssueById); 
issueRouter.put("/issue/update/:id", issueController.updateIssueById);
issueRouter.delete("/issue/delete/:userId", issueController.deleteIssueById);


module.exports = issueRouter;





const mongoose = require('mongoose');
const Repository = require('../models/repoModel');
const User = require('../models/userModel');
const Issue = require('../models/issueModel');


async function createIssue(req, res) {
    const { title, description } = req.body;
    const { id } = req.params;

    try {
        const issue = new Issue({
            title,
            description,
            repository: id,
        });
        await issue.save();
        res.status(201).json(issue);
    } catch (err) {
        console.err("Error during issue creation : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function updateIssueById(req, res) { 

    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ error: "Issue Not Found !" });
        }
        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();
        res.status(200).json(issue, { messsge: "Issue Updated Successfully !" });

    } catch (err) {
        console.err("Error during issue updation : ", err.message);
        res.status(500).send("Server Error");
    }
};
async function deleteIssueById(req, res) { 

    const { id } = req.params;

    try {
        const issue = await Issue.findByIdAndDelete(id);
        if (!issue) {
            return res.status(404).json({ error: "Issue Not Found !" });
        }
        res.json({ messsge: "Issue Deleted Successfully !" });
    } catch (err) {
        console.err("Error during issue deletion : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function getAllIssues(req, res) { 

    const { id } = req.params;
    try {
        const issues = await Issue.find({ repository: id });
        if (!issues) {
            return res.status(404).json({ error: "Issue Not Found !" });
        }
        res.status(200).json(issues);
    } catch (err) {
        console.err("Error during fetching issue : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function getIssueById(req, res) { 

    const { id } = req.params;
    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ error: "Issue Not Found !" });
        }
        res.json(issue);

    } catch (err) {
        console.err("Error during fetching issue : ", err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = {
    getAllIssues,
    createIssue,
    deleteIssueById,
    updateIssueById,
    getIssueById,
};
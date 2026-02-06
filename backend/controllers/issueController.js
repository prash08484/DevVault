const createIssue = (req, res) => {
    res.send("Issue created");
};

const updateIssueById = (req, res) => {
    res.send("Update Issue by Id !");
};
const deleteIssueById = (req, res) => {
    res.send("Delete Issue by Id !");
};

const getAllIssues = (req, res) => {
    res.send("All Issues geted !");
};

const getIssueById = (req, res) => {
    res.send("Issues geted by Id ! ");
};



module.exports = {
    getAllIssues,
    createIssue,
    deleteIssueById,
    updateIssueById,
    getIssueById,
};
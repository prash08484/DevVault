// mongoose approach 
const mongoose = require('mongoose');
const Repositiory = require('../models/repoModel');
const User = require('../models/userModel');
const Issue = require('../models/issueModel');

async function createRepository(req, res) {
    // res.send("Repository created");

    const { owner, name, issues, content, description, visibility } = req;

    try {
        // check-1 repo name 
        if (!name) {
            return res.status(400).json({ error: "Repositiory name is required" });
        }
        // check-2  owner in already db or not 
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "Invalid User Id" });
        }

        // new repo
        const newRepositiory = new Repositiory({
            name, description, visibility, owner, content, issues
        });

        const result = await newRepositiory.save();

        // _id should explicitly mentioned due to mongoDB

        res.status(201).json({
            message: "Repositiory Created!",
            repositioryID: result._id,
        });

    } catch (err) {
        console.err("Error during repositiory creation : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function getAllRepositories(req, res) {
    // res.send("All repositiories fetched !");

    try {

        const repositiory = await Repositiory.find({})
            .populate("owner")
            .populate("issues");
        // populate to get data of that id , find just return id

        res.json(repositiory);

    } catch (err) {
        console.err("Error during fetching repositiory  : ", err.message);
        res.status(500).send("Server Error");
    }

};

async function fetchRepositoriesById(req, res) {
    // res.send("Repositiory Fetched by Id ! ");

    const { repoId } = req.params;

    try {
        const repositiory = await Repositiory.find({ _id: repoId })
            .populate("owner")
            .populate("issues")
            .toArray();
        res.json(repositiory);

    } catch (err) {
        console.err("Error during fetching repositiory : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function fetchRepositoriesByName(req, res) {
    // res.send("Repositiory Details Fetched by Name !");

    const { repoName } = req.params;

    try {
        const repositiory = await Repositiory.find({ name: repoName })
            .populate("owner")
            .populate("issues")
            .toArray();
        res.json(repositiory);

    } catch (err) {
        console.err("Error during fetching repositiory : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function fetchRepositioriesForCurrentUser(req, res) {
    // res.send("Repository fetched for logged in user !");
    const userId = req.user;

    try {
        const repositiories = await Repositiory.find({ owner: userId });

        if (!repositiories || repositiories.length == 0) {
            return res.status(404).send("User Repositioy not found !");
        }
        res.json(({ message: "Repositiories found !", repositiories }));

    } catch (err) {
        console.err("Error during fetching user repositiory : ", err.message);
        res.status(500).send("Server Error");
    }

};

async function updateRepositoryById(req, res) {
    // res.send("Update Repositiory by Id !");
    const { id } = req.params;
    const { content, description } = req.body;
    // name update---

    try {
        const repositiory = await Repositiory.findById(id);
        if (!repositiory) {
            return res.status(404).send("User Repositioy not found !");
        }

        // if repo is present
        repositiory.content.push(content);
        repositiory.description.push(description);
        const UpdateRepositiory = await repositiory.save();

        res.json({
            message: "Repositiory updated successfully !",
            repositiory: UpdateRepositiory
        });

    } catch (err) {
        console.err("Error during repositiory updation : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function toggleVisibilityById(req, res) {
    // res.send("Toggle Repositiory by Id !");

    const { id } = req.params;
    // name update---

    try {
        const repositiory = await Repositiory.findById(id);
        if (!repositiory) {
            return res.status(404).send("User Repositioy not found");
        }

        // if repo is present
        repositiory.visibility = !repositiory.visibility;
        repositiory.description.push(description);
        const UpdateRepositiory = await repositiory.save();

        res.json({
            message: "Repositiory Visibility Toggled Successfully !",
            repositiory: UpdateRepositiory
        });
    } catch (err) {
        console.err("Error during repositiory visibility toggling : ", err.message);
        res.status(500).send("Server Error");
    }

};

async function deleteRepositioryById(req, res) {
    // res.send("Delete Repositiory by Id !");

    const { id } = req.params;
    // name update---

    try {
        const repositiory = await Repositiory.findByIdAndDelete(id);
        if (!repositiory) {
            return res.status(404).send("User Repositioy not found");
        }
        res.json({
            message: "Repositiory deleted Successfully !"
        });
    } catch (err) {
        console.err("Error during repositiory deletion : ", err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = {
    getAllRepositories,
    createRepository,
    deleteRepositioryById,
    toggleVisibilityById,
    updateRepositoryById,
    fetchRepositioriesForCurrentUser,
    fetchRepositoriesByName,
    fetchRepositoriesById,
};
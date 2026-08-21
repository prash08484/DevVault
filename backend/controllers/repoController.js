// mongoose approach 
const mongoose = require('mongoose');
const Repository = require('../models/repoModel');
const User = require('../models/userModel');
const Issue = require('../models/issueModel');

async function createRepository(req, res) {

    const { owner, name, issues, content, description, visibility } = req.body;

    try {
        // check-1 repo name 
        if (!name) {
            return res.status(400).json({ error: "Repository name is required" });
        }
        // check-2  owner in already db or not 
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ error: "Invalid User Id" });
        }

        // new repo
        const newRepository = new Repository({
            name, description, visibility, owner, content, issues
        });

        const result = await newRepository.save();

        // _id should explicitly mentioned due to mongoDB

        res.status(201).json({
            message: "Repository Created!",
            repositioryID: result._id,
        });

    } catch (err) {
        console.err("Error during repository creation : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function getAllRepositories(req, res) {
    try {

        const repository = await Repository.find({})
            .populate("owner")
            .populate("issues");

        // const repositories = await Repository.find({})
        //     .populate("owner")
        //     .populate("issues");

        res.json(repository);

    } catch (err) {
        console.err("Error during fetching repository  : ", err.message);
        res.status(500).send("Server Error");
    }

};

async function fetchRepositoriesById(req, res) {

    const { id } = req.params;

    try {
        const repository = await Repository.find({ _id: id })
            .populate("owner")
            .populate("issues")
            .toArray();
        res.json(repository);

    } catch (err) {
        console.err("Error during fetching repository : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function fetchRepositoriesByName(req, res) {

    const { name } = req.params;

    try {
        const repository = await Repository.find({ name })
            .populate("owner")
            .populate("issues")
            .toArray();

        res.json(repository);

    } catch (err) {
        console.err("Error during fetching repositiory : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function fetchRepositoriesForCurrentUser(req, res) {
    const userId = req.user;

    try {
        const repositories = await Repository.find({ owner: userId });

        if (!repositories || repositories.length == 0) {
            return res.status(404).send("User Repositoy not found !");
        }
        res.json(({ message: "Repositories found !", repositories }));

    } catch (err) {
        console.log("Error during fetching user repository : ", err.message);
        res.status(500).send("Server Error");
    }

};

async function updateRepositoryById(req, res) {
    const { id } = req.params;
    const { content, description } = req.body;

    try {
        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).send("User Repository not found !");
        }

        repository.content.push(content);
        repository.description = description;

        const UpdateRepository = await repository.save();

        res.json({
            message: "Repository updated successfully !",
            repository: UpdateRepository
        });

    } catch (err) {
        console.log("Error during repository updation : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function toggleVisibilityById(req, res) {

    const { id } = req.params;

    try {
        const repository = await Repository.findById(id);
        if (!repository) {
            return res.status(404).send("User Repository not found");
        }

        // if repo is present
        repository.visibility = !repository.visibility;
        await repository.save();

        const UpdateRepository = await repository.save();

        res.json({
            message: "Repository Visibility Toggled Successfully !",
            repositiory: UpdateRepository
        });
    } catch (err) {
        console.log("Error during repository visibility toggling : ", err.message);
        res.status(500).send("Server Error");
    }

};

async function deleteRepositoryById(req, res) {

    const { id } = req.params;

    try {
        const repository = await Repository.findByIdAndDelete(id);
        if (!repository) {
            return res.status(404).send("User Repository not found");
        }
        res.json({
            message: "Repository deleted Successfully !"
        });
    } catch (err) {
        console.log("Error during repository deletion : ", err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = {
    getAllRepositories,
    createRepository,
    deleteRepositoryById,
    toggleVisibilityById,
    updateRepositoryById,
    fetchRepositoriesForCurrentUser,
    fetchRepositoriesByName,
    fetchRepositoriesById,
};
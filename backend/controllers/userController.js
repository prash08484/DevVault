const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { MongoClient, ReturnDocument } = require("mongodb");
const dontenv = require("dotenv");
const ObjectId = require('mongodb').ObjectId;

dontenv.config();

const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
    if (!client) {
        client = new MongoClient(uri, {
            useNewUrlParset: true,
            unseUnifiedTopology: true
        });
        // wait till get connection 
        await client.connect();
    }
};

async function signup(req, res) {
    const { username, password, email } = req.body;
    try {
        await connectClient();
        // update it from mongodb
        const db = client.db("devVault");
        const userCollection = db.collection("users");

        // check is user alreday exit or not 
        const user = await userCollection.findOne({ username });
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            }
            );
        }

        // create user 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUesr = {
            username,
            password: hashedPassword,
            email,
            rempositories: [],
            followedUsers: [],
            starRepo: []
        }
        const result = await userCollection.insertOne(newUesr);

        const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(201).json({
            token,
            userId: result.insertedId
        });
    }
    catch (err) {
        console.log("Error during signup ", err.message);
        res.status(500).send("Server Error");
    }
};

async function login(req, res) {
    const { email, password } = req.body;
    try {
        await connectClient();
        const db = client.db('devVault');
        const usersCollection = db.collection("users");

        // check is user is avl 
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials !" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials !" });
        }

        // avl then refresh the jwt token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(201).json({
            token,
            userId: result.insertedId
        });
    }
    catch (err) {

        console.log("Error during login : ", err.message);
        res.status(500).send("Server Error");
    } 
};

async function getAllUsers(req, res) {
    try {
        // connetion established 
        await connectClient();
        const db = client.db("devVault");
        const usersCollection = db.collection("users");

        const users = await usersCollection.find({}).toArray();
        // circular mongodb structure -> json  use toArray()

        res.json(users);
    }
    catch (err) {
        console.log("Error during Fetching : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function getuserProfile(req, res) {
    const currentId = req.params.id;

    try {
        await connectClient();
        const db = client.db("devVault");
        const usersCollection = db.collection("users");

        // object id for converting string id to object 

        const user = await usersCollection.findOne({
            _id: new ObjectId(currentId)
        });
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        res.send(user);
    }
    catch (err) {
        console.log("Error during Fetching : ", err.message);
        res.status(500).send("Server Error");
    }
};

async function updateUserProfile(req, res) {
    const currentId = req.params.id;
    const { email, password } = req.body;
    try {
        await connectClient();
        const db = client.db("devVault");
        const usersCollection = db.collection("users");

        let updateFileds = { email };
        if (password) {
            // hash pass before passing
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFileds.password = hashedPassword;
        }

        const updatedUser = await usersCollection.findOneAndUpdate(
            { _id: new ObjectId(currentId) },
            { $set: updateFields },
            { returnDocument: "after" }
        );

        if (!updatedUser.value) {
            return req.status(404).json({ message: "User Not Found ! " });
        }
        res.send(updatedUser.value);
    }
    catch (err) {
        console.log("Error during Updating : ", err.message);
        res.status(500).send("Server Error");
    }

};

async function deleteUserProfile(req, res) {
    const currentId = req.params.id;
    try {
        await connectClient();
        const db = client.db("devVault");
        const usersCollection = db.collection("users");

        const result = await usersCollection.deleteOne({
            _id: new ObjectId(currentId)
        });

        if (result.deletedCount == 0) {
            return res.status(404).json({ message: "User Not Found ! " });
        }
        res.json({ message: "User Profile Deleted " });
    }
    catch (err) {
        console.log("Error during Deleting : ", err.message);
        res.status(500).send("Server Error");
    }

};


module.exports = {
    signup,
    login,
    getuserProfile,
    getAllUsers,
    deleteUserProfile,
    updateUserProfile
};
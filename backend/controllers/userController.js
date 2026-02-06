const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { MongoClient } = require("mongodb");

const dontenv = require("dotenv");
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
}

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

        const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json(token);
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
        res.json({ token, userId: user._id });
    }
    catch (err) {

        console.error("Error during login : ", err.message);
        res.send(500).send("Server Error");

    }
    res.send(
        "logging up!"
    )
};

const getAllUsers = (req, res) => {
    res.send(
        "All users fetched!"
    )
};
const getuserProfile = (req, res) => {
    res.send(
        "Profile fetched!"
    )
};
const updateUserProfile = (req, res) => {
    res.send(
        "Profile Updated!"
    )
};
const deleteUserProfile = (req, res) => {
    res.send(
        "Profile deleted!"
    )
};


module.exports = {
    signup,
    login,
    getuserProfile,
    getAllUsers,
    deleteUserProfile,
    updateUserProfile
};
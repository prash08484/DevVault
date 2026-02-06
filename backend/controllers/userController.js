// const { model } = require("mongoose")

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
const signup = (req, res) => {
    res.send(
        "Signing up!"
    )
};
const login = (req, res) => {
    res.send(
        "logging up!"
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
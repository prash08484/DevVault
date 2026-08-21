const express = require('express');
const userController = require("../controllers/userController")  

const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);

userRouter.get("/userProfile/:id", userController.getuserProfile);

userRouter.post("/signup/", userController.signup);

userRouter.post("/login/", userController.login);

userRouter.delete("/deleteProfile/:id", userController.deleteUserProfile);

userRouter.put("/updateProfile/:id", userController.updateUserProfile);


module.exports = userRouter;
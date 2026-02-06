const express = require('express');
const userController = require("../controllers/userController")
const userRouter = require('./user.router');
const mainRouter = require('./main.router');

const userRouter = express.Router();
mainRouter.use(userRouter);

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.get("/userProfile", userController.getuserProfile);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.delete("/deleteProfile", userController.deleteUserProfile);
userRouter.put("/updateProfile", userController.updateUserProfile);


module.exports = userRouter;



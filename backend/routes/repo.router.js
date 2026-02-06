const express = require('express');
const repoController = require("../controllers/repoController")

const repoRouter = express.Router();
// mainRouter.use(repoRouter);

repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRepositories);
repoRouter.get("/repo/:id", repoController.fetchRepositoriesById);
repoRouter.get("/repo/:name", repoController.fetchRepositoriesByName);
repoRouter.get("/repo/:userId", repoController.fetchRepositioriesForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepositoryById);
repoRouter.patch("/repo/delete/:id", repoController.toggleVisibilityById);
repoRouter.delete("/repo/toggle/:id", repoController.deleteRepositioryById);


module.exports = repoRouter;





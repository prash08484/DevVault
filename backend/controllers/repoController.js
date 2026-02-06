const createRepository = (req, res) => {
    res.send("Repository created");
};

const getAllRepositories = (req, res) => {
    res.send("All repositiories fetched !");
};

const fetchRepositoriesById = (req, res) => {
    res.send("Repositiory Fetched by Id ! ");
};

const fetchRepositoriesByName = (req, res) => {
    res.send("Repositiory Details Fetched by Name !");
};

const fetchRepositioriesForCurrentUser = (req, res) => {
    res.send("Repository fetched for logged in user !");
};

const updateRepositoryById = (req, res) => {
    res.send("Update Repositiory by Id !");
};

const toggleVisibilityById = (req, res) => {
    res.send("Toggle Repositiory by Id !");
};

const deleteRepositioryById = (req, res) => {
    res.send("Delete Repositiory by Id !");
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
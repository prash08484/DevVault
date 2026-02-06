const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { pushRepo } = require("./controllers/push");
const { commitRepo } = require("./controllers/commit");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

yargs(hideBin(process.argv))
    .command("start", "Starts a new server", {}, startServer)
    .command("init", "Initialize the a new repository", {}, initRepo)
    .command("add <file>",
        "Add a file to the repository",
        (yargs) => {
            yargs.positional("file", {
                describe: "File to added to the staging area",
                type: "string"
            });
        },
        (argv) => {
            addRepo(argv.file);
        })
    .command("commit <message>", "Commit the a staged file",
        (yargs) => {
            yargs.positional("message", {
                describe: "Commit message",
                type: "string"
            });
        },
        (argv) => {
            commitRepo(argv.message);
        }
    )
    .command("push", "Pushed the changes to the repository", {}, pushRepo)
    .command("pull", "Pull the commits from the repository", {}, pullRepo)
    .command("revert <commitID>", "Revert back to specific commit ", (yargs) => {
        yargs.positional("commitId", {
            describe: "Commit ID to revert to",
            type: "string",
        });
    }, revertRepo)
    .demandCommand(1, "You need atleast one commnand").help().argv;

// adding server logic 

 function startServer(){
    console.log("server logic called");
 }






































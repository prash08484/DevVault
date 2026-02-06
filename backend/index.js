const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');


const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { pushRepo } = require("./controllers/push");
const { commitRepo } = require("./controllers/commit");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");


dotenv.config();

// adding the devVault commands 
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
function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;
    console.log("server logic called");

    app.use(bodyParser.json());
    app.use(express.json());

    const mongoURI = process.env.MONGODB_URI;

    // db connect
    mongoose
        .connect(mongoURI)
        .then(() => console.log("mongoDB connected !")
            .catch((err) => console.error("Unable to connect: ", err))
        );

    // all the req. from any type of hit 
    app.use(cors({ origin: "*" }));

    app.get('/', (req, res) => {
        res.send("Hello buddy !");
    });

    // temporary user 
    let user = "test";

    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    }
    );

    // setup socket 
    io.on("connection", (socket) => {
        socket.on("joinRoom", (userID) => {
            user = userID;
            console.log("======");
            console.log(user);
            console.log("======");
            socket.join(userID);
        });
    });

    // multiple req. at same time  
    const db = mongoose.connection;
    db.once("open", async () => {
        console.log("CURD operations called");
        // CRUD operations 

        
    });

    // listen server 
    httpServer.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
    })

}






































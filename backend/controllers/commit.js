const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// import { v4 as uuidv4 } from "uuid";

async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), ".devGit");
    const stagedPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");

    try {
        const commitId = uuidv4(); // return unique id 
        const commitDir = path.join(commitPath, commitId);
        await fs.mkdir(commitDir, { recursive: true });

        // move the content of staging area to commitDir
        const files = await fs.readdir(stagedPath); // read all files
        // copy content
        for (const file of files) {
            await fs.copyFile(path.join(stagedPath, file), path.join(commitDir, file));
        }

        // trace the changes
        await fs.writeFile(
            path.join(commitDir, "commit.json"), JSON.stringify(
                {
                    message, date: new Date().toISOString
                }
            )
        );

        console.log(`Commit ${commitId} created with message : ${message}`);

    } catch (err) {

        console.log("Error commiting the files : ", err);
    } 
}

module.exports = { commitRepo };





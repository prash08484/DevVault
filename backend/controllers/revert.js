const fs = require('fs');
const path = require('path');

// if commitID exist then take action only 
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID) {
    const repoPath = path.resolve(process.cwd(), ".devGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitDir = path.join(commitsPath, commitID);
        const files = await readdir(commitDir);
        const parentDir = path.resolve(repoPath, "..");

        // trace files
        for (const file of files) {
            await copyFile(path.join(commitDir, file), path.join(parentDir, file));
        }
        console.log(`Commit ${commitID} reverted successfully !`);
    }
    catch (err) {
        console.log("Unable to Revert : ", err);
    }
}

module.exports = { revertRepo };








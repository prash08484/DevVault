const fs = require('fs').promises;
const path = require('path');

async function initRepo() {
    const repoPath = path.resolve(process.cwd(), ".devGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitsPath, { recursive: true });
        await fs.writeFile(
            path.join(repoPath, "congfig.json"),
            JSON.stringify({ bucket: process.env.S3_BUCKET })
        );
        console.log("Repository Initialized")
    } catch (err) {
        console.err("Error initializing the repository", err);
    }
}

module.exports = { initRepo };
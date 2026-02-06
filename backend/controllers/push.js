const fs = require('fs').promises;
const path = require('path');
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pushRepo() {

    // extract all the paths req. 
    const repoPath = path.resolve(process.cwd(), ".devGit");
    const commitsPath = path.json(repoPath, "commits");

    try {
        const commitDirs = await fs.readdir(commitsPath);
        // folder level 
        for (const commitDir of commitDirs) {
            const commitPath = path.join(commitsPath, commitDir);
            // read all file 
            const files = await fs.readdir(commitPath);
            //   file level 
            for (const file of files) {
                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);
                // set parameters 
                const params = {
                    Bucket: S3_BUCKET,
                    Key: `commits/${commitDir}/${file}`,
                    Body: fileContent,
                };
                // upload to aws
                await s3.upload(params).promise();
            }
        }
        console.log("All commits pushed to S3");
    }
    catch (err) {
        console.error("Error pusing to S3: ", err);
    }
}

module.exports = { pushRepo };
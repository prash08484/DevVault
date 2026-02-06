const fs = require('fs').promises;
const path = require('path');
const { s3, S3_BUCKET } = require("../config/aws-config");


async function pullRepo() {

    const repoPath = path.resolve(process.cwd(), ".devGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        // extract data from S3
        const data = await s3.listObjectsV2({
            Bucket: S3_BUCKET,
            Prefix: "commits/",
        }).promise();

        const objects = data.Contents;

        for (const object of objects) {
            const key = object.Key;
            const commitDir = path.join(commitsPath, path.dirname(key).split('/').pop());

            await fs.mkdir(commitDir, { recursive: true });

            const params = {
                Bucket: S3_BUCKET,
                Key: key,
            };

            const fileContent = await s3.getObject(params).promise();
            await fs.writeFile(path.join(repoPath, key), fileContent.Body);
        }

        console.log("All commits pulled From S3 BUCKET");
    }
    catch (err) {
        console.log("Error during pulling repository: " + err);
    }
    console.log("Pull Repo");
}

module.exports = { pullRepo };
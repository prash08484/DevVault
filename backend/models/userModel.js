const mongoose = require('mongoose');
const { Schema } = mongoose;

// schema design 
const UserScheam = new Schema({
    userName: {
        type: String,
        requied: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        requried: true,
    },
    repositories: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "Repository",
        }
    ],
    followedUsers: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    starRepos: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "Repository",
        }
    ],

});

const User = mongoose.model("User", UserScheam);

// export 
export default User;

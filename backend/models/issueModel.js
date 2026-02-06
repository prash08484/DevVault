const mongoose = require('mongoose');
const { Schema } = mongoose;

const IssueSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        requried: true,
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open",
    },
    repository: {
        type: Schema.Types.ObjectId,
        ref: "Repositiory",
        requried: true,
    },
});

const Issue = mongoose.model("Issue", IssueSchema);

export default Issue;












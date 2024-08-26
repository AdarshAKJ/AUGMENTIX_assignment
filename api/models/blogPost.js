const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPost = new Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BlogPost", blogPost);

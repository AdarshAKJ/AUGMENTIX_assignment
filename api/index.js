require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const express = require("express");
const cors = require("cors");
const blogPost = require("./models/blogPost.js");
const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    console.log("working");
    res.json({ data: "hello" });
});


// Create a new blog post
app.post('/api/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new blogPost({ title, content });
        await newPost.save();
        return res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating a new post:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get all blog posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await blogPost.find();
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get a single blog post by ID
app.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await blogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching the post:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update a blog post
app.put('/api/posts/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPost = await blogPost.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error updating the post:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a blog post
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const deletedPost = await blogPost.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting the post:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


app.listen(5000);

module.exports = app;
const express = require('express');
const Post = require('../models/post')
const router = express.Router();


// Retrieve all posts
router.get('/', async (req, res) => {
    try {
        console.log('dos');
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})

// Submit a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch (err) {
        res.json({ message: err })
    }
})


// Retrieve a specific post
router.get('/:postID', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID)
        res.json(post);
    } catch (err) {
        res.json({ message: err })
    }

})

// Delete a specific post
router.delete('/:postID', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postID })
        res.json(removedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

// Update a specific post
router.patch('/:postID', async (req, res) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.postID },
            { $set: { description: req.body.description } },
            { upsert: true });
        res.json(updatedPost)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router;
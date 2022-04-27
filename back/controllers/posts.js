import Posts from '../models/posts.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find();
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ err })
    }
};

export const createPosts = async (req, res) => {
    const post = req.body;
    const newPost = new Posts(post)
    try {
        await newPost.save()
    } catch (err) {
        res.status(409).json({ err })
    }
};
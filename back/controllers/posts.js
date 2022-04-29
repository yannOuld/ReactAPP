import Posts from '../models/posts.js';
import mongoose from 'mongoose';

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

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    const valid = mongoose.Types.ObjectId.isValid(id);

    if (!valid) return res.status(404).send('Post not Found !');

    const modifiedPost = await Posts.findByIdAndUpdate(id, { ...post, id }, { new: true });
    res.json(modifiedPost)
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const valid = mongoose.Types.ObjectId.isValid(id);

    if (!valid) return res.status(404).send('Post not Found !');

    await Posts.findByIdAndRemove(id);
    res.json({ message: 'Post deleted' })

};

export const likePost = async (req, res) => {
    const { id } = req.params;
    const valid = mongoose.Types.ObjectId.isValid(id);

    if (!valid) return res.status(404).send('Post not Found !');
    const post = await Posts.findById(id);
    const likePost = await Posts.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })
    res.json(likePost)
}
const Blog = require('../models/blogModel')

const mongoose = require('mongoose')

//get all blogs
const getAllBlog = async (req, res) => {
    const blogs = await Blog.find({}).populate('user').populate('tags').sort({ createdAt: -1 });
    res.status(200).json(blogs)
}

//get a single blog
const getByIdBlog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such blog' })
    }
    const blog = await Blog.findById(id)
    if (!blog) {
        return res.status(404).json({ error: "No Such blog" })
    }
    res.status(200).json(blog)
}

//create a blog
const createBlog = async (req, res) => {
    const imagePath = req.file ? req.file.path : '';
    const { title, details, user } = req.body;
    const decodedDetails = decodeURIComponent(details); // Decode HTML content
    let tags = req.body.tags;
    if (!Array.isArray(tags)) {
        tags = JSON.parse(tags);
    }
    try {
        const blog = await Blog.create({
            title,
            tags,
            image: imagePath,
            details: decodedDetails,
            user
        });

        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//delete a blog
const deleteBlog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such blog' })
    }
    const blog = await Blog.findOneAndDelete({ _id: id })
    if (!blog) {
        return res.status(404).json({ error: "No Such blog" })
    }
    res.status(200).json(blog)
}

//update a blog
const updateBlog = async (req, res) => {
    const { id } = req.params;
    const imagePath = req.file ? req.file.path : '';
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such blog' });
    }
    try {
        let updateData = { ...req.body };
        if (req.file) {
            // Validate file type (assuming you have a function to check the file type)
            if (!isValidImageFile(req.file)) {
                return res.status(400).json({ error: 'Uploaded file is not a valid image' });
            }
            // If a file is uploaded, update the image path
            updateData.image = imagePath;
        }
        const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, updateData, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ error: 'No such blog' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createBlog,
    getAllBlog,
    getByIdBlog,
    deleteBlog,
    updateBlog
}
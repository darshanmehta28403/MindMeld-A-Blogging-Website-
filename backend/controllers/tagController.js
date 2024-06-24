const Tag = require('../models/tagModel')
const Blog = require('../models/blogModel')

const mongoose = require('mongoose')

//get all tags
const getAllTag = async (req, res) => {
    const tags = await Tag.find({}).sort({ createdAt: -1 })
    res.status(200).json(tags)
}

//get a single tag
const getByIdTag = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such tag' })
    }
    const tag = await Tag.findById(id)
    if (!tag) {
        return res.status(404).json({ error: "No Such tag" })
    }
    res.status(200).json(tag)
}

//create a tag
const createTag = async (req, res) => {
    //add document or tag in db
    const { name } = req.body
    try {
        const tag = await Tag.create({ name })
        res.status(200).json(tag)
    } catch (error) {
        res.status(400).json({ erre: error.message })
    }
}

//delete a tag
const deleteTag = async (req, res) =>{
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such tag' });
        }
        // Find and delete the tag
        const tag = await Tag.findOneAndDelete({ _id: id });
        if (!tag) {
            return res.status(404).json({ error: "No Such tag" });
        }
        // Remove the tag reference from blogs
        await Blog.updateMany(
            { tags: id }, // Find blogs that have the tag
            { $pull: { tags: id } } // Remove the tag from the array
        );
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//update a tag
const updateTag = async (req, res)=>{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such tag' })
    }
    const tag = await Tag.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if (!tag) {
        return res.status(404).json({ error: "No Such tag" })
    }
    res.status(200).json(tag)
}

module.exports = {
    getAllTag,
    getByIdTag,
    createTag,
    deleteTag,
    updateTag
}
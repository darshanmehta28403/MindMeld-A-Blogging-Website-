const User = require('../models/userModel')
const Blog = require('../models/blogModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// const createToken = (_id) =>{
//     return jwt.sign({_id}, process.env.SESSION_SECRET, {expiresIn: '3d'})
// }

//get all users
const getAllUser = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(users)
}

const validateUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            res.status(400).json({ error: "No such user !!" });
        } else {
            if (user.password === password) {
                const expiresIn = 2 * 60 * 60;
                if (user.isAdmin === "yes") {
                    const token = jwt.sign({
                        id: user._id,
                        username: username,
                        admin: user.isAdmin
                    }, process.env.SESSION_SECRET, { expiresIn })
                    res.status(200).json(token);
                }
                else {
                    const token = jwt.sign({
                        id: user._id,
                        username: username
                    }, process.env.SESSION_SECRET, { expiresIn })
                    res.status(200).json(token);
                }
            }
            else {
                res.status(400).json({ error: "Invalid username or password !!" });
            }
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get a single user
const getByIdUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }
    const user = await User.findById({ _id: id })
    if (!user) {
        return res.status(404).json({ error: "No Such user" })
    }
    res.status(200).json(user)
}

//create a user
const createUser = async (req, res) => {
    //add document or user in db
    const { fname, lname, username, gender, email, password } = req.body
    try {
        const user = await User.create({ fname, lname, username, gender, email, password })
        res.status(200).json(user)
    }
    catch (error) {
        res.status(400).json({ erre: error.message })
    }
}

//delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' });
    }
    try {
        const user = await User.findById({_id: id});
        if (!user) {
            return res.status(404).json({ error: 'No such user' });
        }

        let deletedUser = await User.findByIdAndDelete({_id: id});
        if (!deletedUser) {
            return res.status(404).json({ error: 'Failed to delete user' });
        }

        const deletedBlogs = await Blog.deleteMany({ user: id });
        if (!deletedBlogs) {
            return res.status(404).json({ error: 'Failed to delete associated blogs' });
        }

        res.status(200).json({ user: deletedUser, blogs: deletedBlogs });
    } catch (error) {
        console.error('Error deleting user and associated blogs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//update a user
const updateUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }
    const user = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!user) {
        return res.status(404).json({ error: "No Such user" })
    }
    res.status(200).json(user)
}

module.exports = {
    getAllUser,
    getByIdUser,
    validateUser,
    createUser,
    deleteUser,
    updateUser
}
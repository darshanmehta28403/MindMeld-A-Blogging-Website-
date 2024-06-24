const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    tags:[{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    image:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: false
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Blog', blogSchema)
const express = require('express');
const multer = require('multer');
const { getAllBlog, getByIdBlog, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the directory where you want to store the images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // define how the file should be named
    }
});

const upload = multer({ storage: storage });

// get all tags
router.get('/', getAllBlog);

// get single tag
router.get('/:id', getByIdBlog);

// post tag
router.post('/', upload.single('image'), createBlog);

// delete tag
router.delete('/:id', deleteBlog);

// update tag
router.patch('/:id', upload.single('image'), updateBlog); // Include multer middleware here

module.exports = router;

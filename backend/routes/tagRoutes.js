const express = require('express')

const router = express.Router()

const {getAllTag, getByIdTag, createTag, deleteTag, updateTag} = require('../controllers/tagController')

router.get('/', getAllTag)

router.get('/:id', getByIdTag)

router.post('/', createTag)

router.delete('/:id', deleteTag)

router.patch('/:id', updateTag)

module.exports = router

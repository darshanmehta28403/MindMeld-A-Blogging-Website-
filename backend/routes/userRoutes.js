const express = require('express')

const router = express.Router()

const {getAllUser, getByIdUser, validateUser, createUser, deleteUser, updateUser} = require('../controllers/userController')

router.get('/',getAllUser)

router.get('/:id', getByIdUser)

router.post('/login', validateUser)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

module.exports = router
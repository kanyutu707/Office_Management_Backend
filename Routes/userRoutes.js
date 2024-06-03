const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

router.post('/login', userController.login);
router.post('/register', userController.createUser);
router.get('/get_all', userController.getAllUsers);
router.get('/get/:id', userController.getUserById);

module.exports = router;

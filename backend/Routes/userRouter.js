const express = require('express');
const userController = require('../Controllers/userController');

const userRouter = express.Router();

userRouter.route('/')
.get(userController.GetAllUsers)


// userRouter.route('/:id')
//     .get(userController.getUserById)

module.exports = userRouter;
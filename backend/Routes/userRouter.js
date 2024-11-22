const express = require('express');
const userController = require('../Controllers/userController');
const passport = require('passport');
const userRouter = express.Router();
const authController = require('../Controllers/authController')

userRouter.route('/')
.get( userController.GetAllUsers)


userRouter.route('/:id')
    .get(userController.getUserById)
    .patch(userController.updateUser)



module.exports = userRouter;
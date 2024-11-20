const express = require('express');
const userController = require('../Controllers/userController');
const passport = require('passport');
const userRouter = express.Router();
const authController = require('../Controllers/authController')

userRouter.route('/')
.get(passport.authenticate('jwt', { session: false }) ,authController.forAdmins, userController.GetAllUsers)


userRouter.route('/:id')
    .get(userController.getUserById)

module.exports = userRouter;
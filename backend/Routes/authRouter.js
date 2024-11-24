const authController = require('../Controllers/authController');
const express = require('express');


const authRouter = express.Router();

authRouter.route('/register')
.post(authController.register);

authRouter.route('/login')
    .get(authController.verifyUserExists , authController.login)

authRouter.route('/forgotpass')
    .get(authController.forgotPassword)

authRouter.route('/resetpassword')
    .get(authController.resetPassword)





module.exports = authRouter;
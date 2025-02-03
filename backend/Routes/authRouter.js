const authController = require('../Controllers/authController');
const express = require('express');


const authRouter = express.Router();

authRouter.route('/register')
.post(authController.register);

authRouter.route('/login')
    .post(authController.verifyUserExists , authController.login)

authRouter.route('/forgotpass')
    .post(authController.forgotPassword)

authRouter.route('/resetpassword')
    .post(authController.resetPassword)


authRouter.route('/validate')
    .post(authController.validateJwt)





module.exports = authRouter;
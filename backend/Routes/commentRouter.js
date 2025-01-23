const commentController = require('../Controllers/commentController')
const express = require('express');
const passport = require("passport");

commentRouter = express.Router()

commentRouter.route('/' ,)
.post(passport.authenticate('jwt', { session: false }) , commentController.verifyUserIdentity, commentController.createComment)



module.exports = commentRouter;
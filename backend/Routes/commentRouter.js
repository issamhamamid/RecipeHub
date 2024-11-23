const commentController = require('../Controllers/commentController')
const express = require('express');

commentRouter = express.Router()

commentRouter.route('/' ,)
.post(commentController.createComment)



module.exports = commentRouter;
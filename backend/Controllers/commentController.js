const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');
const {asyncHandler} = require('../Util/asyncHandler')
const responseHandler = require("../Util/responseHandler");
const Apifeatures = require('../Util/Apifeatures')
const customError = require("../Error/customError");
const {syncHandler} = require("../Util/syncHandler");


module.exports.verifyUserIdentity = syncHandler((req , res , next)=>{
    const comment = req.body;
    if(comment.user_id === req.user.id){
       return next()
    }
    throw new customError(403 , "Forbidden ")
})

module.exports.createComment = asyncHandler( async (req , res , next) =>{
    const comment = req.body;
    const created  = await Comment.create(comment)
    responseHandler(req , res , '201' , created)


})




module.exports.deleteComment = asyncHandler(async (req , res , next)=>{
    const { id } = Number(req.params);
    const comment = await Recipe.findByPk(id);

    if (!comment) {
        throw new customError(404 , "NOT FOUND")
    }

    await comment.destroy();

    responseHandler(req , res , 200 , "");
})
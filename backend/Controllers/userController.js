const User = require('../models/User')
const responseHandler = require('../Util/responseHandler')
const Recipe_Ingredient = require('../models/RecipeIngredient');
const Comment = require('../models/Comment');
const {asyncHandler} = require("../Util/asyncHandler");
const customError = require("../Error/customError");


module.exports.GetAllUsers = async (req , res) => {
 const allUsers = await User.findAll()
 responseHandler(req , res , 200 , allUsers);
}


module.exports.getUserById = asyncHandler(async (req , res) => {
 const id = Number(req.params.id);
 const user = await User.findByPk(id)
 if(user){
  responseHandler(req , res , 200 , user);
 }
 else {
  throw new customError(404 , "NOT FOUND")

 }
})



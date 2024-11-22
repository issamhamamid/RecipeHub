const User = require('../models/User')
const responseHandler = require('../Util/responseHandler')
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


module.exports.updateUser = asyncHandler(async (req, res) => {
 const id = Number(req.params.id);

 const { username, email } = req.body;

 const updatedUser = await User.update(
     { username, email },
     { where: { id: id } }     // need to fix this
 );

 if (updatedUser[0] === 0) {

   throw new customError(404 , "NOT FOUND")
 }
 responseHandler(req , res , 200 , "");
});



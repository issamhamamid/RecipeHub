const User = require('../models/User')
const responseHandler = require('../Util/responseHandler')
const {asyncHandler} = require("../Util/asyncHandler");
const customError = require("../Error/customError");
const {syncHandler} = require("../Util/syncHandler");


module.exports.GetAllUsers = async (req , res) => {
 const allUsers = await User.findAll()
 responseHandler(req , res , 200 , allUsers);
}


module.exports.getUserById = asyncHandler(async (req , res , next) => {
 const id = Number(req.params.id);
 const user = await User.findByPk(id)
 if(user){
  responseHandler(req , res , 200 , user);
 }
 else {
  throw new customError(404 , "NOT FOUND")

 }
})


module.exports.updateUser = asyncHandler(async (req, res , next) => {


 const { username, email } = req.body;

 const updatedUser = await User.update(
     { username, email },
     {
      where: {
       username : req.user.username
      },

     }
 );


 responseHandler(req , res , 200 , "");
});


module.exports.userProfile =  (req , res) =>{

 const userinfo = {
  username : req.user.username,
  email : req.user.email
 }
 responseHandler(req , res , 200 , {
   userinfo
 })
}



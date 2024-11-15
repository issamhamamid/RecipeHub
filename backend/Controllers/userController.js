const User = require('../models/User')
const responseHandler = require('../Util/responseHandler')
const Recipe_Ingredient = require('../models/RecipeIngredient');
const Comment = require('../models/Comment');


module.exports.GetAllUsers = async (req , res) => {
 const allUsers = await User.findAll()
 responseHandler(req , res , 200 , allUsers);
}


// module.exports.CreateUser = async (req , res) => {
//     const user = req.body;
//     await User.save(user)
//     responseHandler(req  , res , 201 , user )
// }
//
//
// module.exports.getUserById = async (req , res) => {
//     const id = Number(req.params.id);
//     const user = await User.findOneBy({
//         id : id
//     })
//     responseHandler(req , res , 200 , user);
// }
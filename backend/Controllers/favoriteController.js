const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Favorite = require('../models/Favorite');
const {asyncHandler} = require('../Util/asyncHandler')
const responseHandler = require("../Util/responseHandler");
const Apifeatures = require('../Util/Apifeatures')
const customError = require("../Error/customError");


module.exports.addFavorite = asyncHandler(async (req , res , next)=>{
    const {id} = req.params;
    const recipe = await Recipe.findByPk(id);
    if(!recipe){
        throw new customError(404 , "Recipe not found")
    }
    await Favorite.create({
        UserId : req.user.id , RecipeId : id
    })
    responseHandler(req , res , 201 , "")                     
})



module.exports.removefavorite = asyncHandler(async ()=>{

})



module.exports.showfavorites = asyncHandler(async (req , res , next) => {
    const data = await req.user.getRecipes()
    responseHandler(req , res , 200 , data)
})
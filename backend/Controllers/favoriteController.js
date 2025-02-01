const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Favorite = require('../models/Favorite');
const {asyncHandler} = require('../Util/asyncHandler')
const responseHandler = require("../Util/responseHandler");
const Apifeatures = require('../Util/Apifeatures')
const customError = require("../Error/customError");

module.exports.checkRecipe = asyncHandler(async (req , res , next) =>{
    const id= Number(req.params.id);
    if(!id){
        throw new customError(400 , "Invalid recipe id ")

    }
    const recipe = await Recipe.findByPk(id);
    if(!recipe){
        throw new customError(404 , "Recipe not found")
    }
    req.recipe = recipe
    next()
})

module.exports.addFavorite = asyncHandler(async (req , res , next)=>{
    const {id} = req.params;
    await Favorite.create({
        UserId : req.user.id , RecipeId : id
    })
    responseHandler(req , res , 201 , "")                     
})



module.exports.removefavorite = asyncHandler(async (req , res , next)=>{
    const {id} = req.params;
    await req.user.removeFavoriteRecipe(req.recipe);
    responseHandler(req , res , 200 , "")
})



module.exports.showfavorites = asyncHandler(async (req , res , next) => {
    const data = await req.user.getFavoriteRecipes({joinTableAttributes: [],})
    responseHandler(req , res , 200 , data)
})


module.exports.isRecipeFavorite = asyncHandler(async (req , res , next)=>{
    const user = req.user;
    const recipe = req.recipe;
    const data =  await user.hasFavoriteRecipe(recipe);
    responseHandler(req , res , 200 , data)

})
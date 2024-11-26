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
    const user = await User.findByPk(1);
    await user.addRecipe(recipe);
    recipes = await  user.getRecipes();
    console.log(recipes)
    
    responseHandler(req , res , 201 , "")                     
})
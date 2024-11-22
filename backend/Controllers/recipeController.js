const Recipe = require("../models/Recipe");
const responseHandler = require("../Util/responseHandler");
const {asyncHandler} = require("../Util/asyncHandler");
const customError = require("../Error/customError");
const User = require("../models/User");


module.exports.GetAllRecipes = asyncHandler(async (req , res,next) => {
    const data = await Recipe.findAll()
    responseHandler(req , res , 200 , data);
})


module.exports.createRecipe = asyncHandler(async  (req , res , next) => {
    const recipe = req.body;
    await Recipe.create(recipe);
    responseHandler(req , res , 200 , recipe)
})
module.exports.getRecipeById = asyncHandler(async (req , res , next) => {
    const id = Number(req.params.id);
    const recipe = await Recipe.findByPk(id)
    if(recipe){
        responseHandler(req , res , 200 , Recipe);
    }
    else {
        throw new customError(404 , "NOT FOUND")

    }
})


module.exports.deleteRecipe = asyncHandler(deleteRecipeMiddleware = async (req, res, next) => {

        const { id } = req.params;
        const recipe = await Recipe.findByPk(id);

        if (!recipe) {
            throw new customError(404 , "NOT FOUND")
        }

        await recipe.destroy();

        responseHandler(req , res , 200 , "");

});

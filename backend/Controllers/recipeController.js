const Recipe = require("../models/Recipe");
const User = require('../models/User')
const responseHandler = require("../Util/responseHandler");
const {asyncHandler} = require("../Util/asyncHandler");
const customError = require("../Error/customError");
const RecipeIngredient = require("../models/RecipeIngredient");
const Apifeatures = require('../Util/Apifeatures')
const Comment = require("../models/Comment");
const {syncHandler} = require("../Util/syncHandler");

module.exports.GetAllRecipes = asyncHandler(async (req , res,next) => {
    let query = {}
    let features = new Apifeatures(req.query ,query , ['category'] ).pagination().search().nutritions().filtering()
    features.query.attributes =  ['id', 'name' , 'calories' , 'carbs' ,'fat' , 'protein' , 'image_url']
    const data = await Recipe.findAndCountAll(features.query)

    responseHandler(req , res , 200 , data);
})


module.exports.createRecipe = asyncHandler(async  (req , res , next) => {
    const recipe = req.body;
    await Recipe.create(recipe);
    responseHandler(req , res , 200 , recipe)
})

module.exports.getRecipeById = asyncHandler(async (req , res , next) => {
        let data = {recipe :req.recipe}
        responseHandler(req , res , 200 , data);

})

module.exports.verifyRecipe = syncHandler((req , res , next)=>{
    const recipe = req.recipe

    if (!recipe) {
        throw new customError(404 , "NOT FOUND")
    }

    next()
})


module.exports.deleteRecipe = asyncHandler( async (req, res, next) => {
        const recipe = req.recipe
        await recipe.destroy();

        responseHandler(req , res , 200 , "");

});


module.exports.getRecipeComments = asyncHandler(async (req , res , next) =>{
    const recipe = req.recipe

    const data = await recipe.getComments({
        include: {
            model: User,
            attributes: ['username'], // Only fetch specific columns
        },
    })

    responseHandler(req , res , 200 , data)

})


module.exports.getRecipeIngredients = asyncHandler(async (req , res , next)=>{
    const recipe = req.recipe

    const data = await recipe.getRecipeIngredients({

    })
    responseHandler(req , res , 200 , data)
})

module.exports.countRecipes = asyncHandler(async (req , res , next)=>{
    const count = await Recipe.count()
    responseHandler(req , res , 200 , Math.ceil(count/17))
})
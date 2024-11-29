const Recipe = require("../models/Recipe");
const responseHandler = require("../Util/responseHandler");
const {asyncHandler} = require("../Util/asyncHandler");
const customError = require("../Error/customError");
const User = require("../models/User");
const Apifeatures = require('../Util/Apifeatures')
const Comment = require("../models/Comment");

module.exports.GetAllRecipes = asyncHandler(async (req , res,next) => {
    let query = {}
    let features = new Apifeatures(req.query ,query , ['category'] ).pagination().search().nutritions().filtering()
    const data = await Recipe.findAll(features.query)
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

        responseHandler(req , res , 200 , recipe);


})


module.exports.deleteRecipe = asyncHandler( async (req, res, next) => {

        const { id } = req.params;
        const recipe = await Recipe.findByPk(id);

        if (!recipe) {
            throw new customError(404 , "NOT FOUND")
        }

        await recipe.destroy();

        responseHandler(req , res , 200 , "");

});


module.exports.getRecipeComments = asyncHandler(async (req , res , next) =>{
    const id = Number(req.params.id)

    const  comments = await Comment.findAll({
        where: {
            id
        }
    })

    responseHandler(req , res , 200 , comments)


})

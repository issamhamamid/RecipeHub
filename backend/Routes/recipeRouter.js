const express = require('express');
const recipeController = require('../Controllers/recipeController');
const passport = require('passport');
const authController = require('../Controllers/authController')
const customError = require("../Error/customError");
const Recipe = require("../models/Recipe");
const {idAsyncHandler} = require("../Util/idAsyncHandler");


const recipeRouter = express.Router();


recipeRouter.param('id' , idAsyncHandler(async (req , res , next , value) =>{
    if(Number(value)){
        req.recipe = await Recipe.findByPk(value)
        if (!req.recipe) {
            throw new customError(404 , "NOT FOUND")
        }
        return next()
    }
    else{
        throw new customError(404 , "PLEASE PROVIDE A VALID RECIPE ID")
    }
}))



recipeRouter.route('/')
    .get(recipeController.GetAllRecipes)
    .post(recipeController.createRecipe)

recipeRouter.route('/count')
    .get(recipeController.countRecipes)

recipeRouter.route('/food/:id')
    .get(recipeController.getRecipeById)
    .delete(recipeController.deleteRecipe)

recipeRouter.route('/food/:id/comments')
    .get(recipeController.verifyRecipe , recipeController.getRecipeComments)

recipeRouter.route('/food/:id/ingredients')
    .get(recipeController.verifyRecipe , recipeController.getRecipeIngredients)



module.exports = recipeRouter;
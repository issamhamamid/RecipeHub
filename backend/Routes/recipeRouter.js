const express = require('express');
const recipeController = require('../Controllers/recipeController');
const passport = require('passport');
const authController = require('../Controllers/authController')
const customError = require("../Error/customError");
const Recipe = require("../models/Recipe");


const recipeRouter = express.Router();


recipeRouter.param('id' , async (req , res , next , value) =>{
    if(Number(value)){
        req.recipe = await Recipe.findByPk(value)
        return next()
    }
    else{
        throw new customError(400 , "Please provide a valid recipe ID")
    }
})

recipeRouter.route('/')
    .get(recipeController.GetAllRecipes)
    .post(recipeController.createRecipe)



recipeRouter.route('/:id')
    .get(recipeController.getRecipeById)
    .delete(recipeController.deleteRecipe)

recipeRouter.route('/:id/comments')
    .get(recipeController.getRecipeComments)

recipeRouter.route('/:id/ingredients')
    .get(recipeController.getRecipeIngredients)

module.exports = recipeRouter;
const express = require('express');
const recipeController = require('../Controllers/recipeController');
const passport = require('passport');
const authController = require('../Controllers/authController')
const customError = require("../Error/customError");


const recipeRouter = express.Router();


recipeRouter.param('id' , (req , res , next , value) =>{
    if(Number(value)){
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

module.exports = recipeRouter;
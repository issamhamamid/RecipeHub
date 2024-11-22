const express = require('express');
const recipeController = require('../Controllers/recipeController');
const passport = require('passport');
const authController = require('../Controllers/authController')

const recipeRouter = express.Router();

recipeRouter.route('/')
    .get(recipeController.GetAllRecipes)
    .post(recipeController.createRecipe)


recipeRouter.route('/:id')
    .get(recipeController.getRecipeById)
    .delete(recipeController.deleteRecipe)



module.exports = recipeRouter;
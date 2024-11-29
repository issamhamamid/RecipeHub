const  {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');
const User = require("./User");

const RecipeIngredient =sequelize.define('RecipeIngredient', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        quantity:{
            type : DataTypes.INTEGER,
            allowNull : false
        }


    } ,
    {
        tableName: 'recipe_ingredients',
        timestamps: false,
    })

Ingredient.belongsToMany(Recipe, { through: RecipeIngredient , as: 'UsedInRecipes'  });
Recipe.belongsToMany(Ingredient, { through: RecipeIngredient, as : 'RecipeIngredients' });

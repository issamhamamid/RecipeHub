const  {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');

const RecipeIngredient =sequelize.define('RecipeIngredient', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        recipe_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references : {
                model : 'recipes',
                key : 'id'
            }
        },
        ingredient_id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references : {
                model : 'ingredients',
                key : 'id'
            }
        }
    } ,
    {
        tableName: 'recipe_ingredients',
        timestamps: false,
    })

RecipeIngredient.belongsTo(Recipe, {
    foreignKey : 'recipe_id'
})

RecipeIngredient.belongsTo(Ingredient, {
    foreignKey : 'ingredient_id'
})

Recipe.hasMany(RecipeIngredient , {
    foreignKey: 'recipe_id',
})

Ingredient.hasMany(RecipeIngredient, {
    foreignKey: 'ingredient_id',
})

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Recipe = require("./Recipe");
const MealPlan = require('./MealPlan')

const MealPlanRecipe = sequelize.define('MealPlanRecipe', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    meal_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Breakfast', 'Lunch', 'Dinner' , 'Snack']], // Only allow these values
        },
    },
}, {
    tableName: 'meal_plan_recipes',
    timestamps: false, // Disable createdAt and updatedAt
});

MealPlan.belongsToMany(Recipe, { through: MealPlanRecipe , as: 'MealPlanRecipes'});
Recipe.belongsToMany(MealPlan, { through: MealPlanRecipe  , as : 'InMealPlans' });

module.exports = MealPlanRecipe;

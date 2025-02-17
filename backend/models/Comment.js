const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust this path to match your project structure
const Recipe = require('../models/Recipe');
const RecipeIngredient = require('../models/RecipeIngredient');
const MealPlanRecipes = require('./MealPlanRecipe');
const User = require('../models/User')


const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'recipes',
            key: 'id',
        },
    },
}, {
    tableName: 'comments',
    timestamps: false,
});

Recipe.hasMany(Comment, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
});


User.hasMany(Comment, { foreignKey: 'user_id' });

Comment.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Comment;

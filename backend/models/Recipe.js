const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/User');


const Recipe = sequelize.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    category: {
        type: DataTypes.ENUM('breakfast', 'lunch' , 'dinner' , 'snack' , 'dessert'),
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    protein: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fat: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    carbs: {
        type: DataTypes.INTEGER,
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
    is_vegan: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    prep_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cook_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    number_of_servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'recipes',
    timestamps: false,
}
);

User.hasMany(Recipe, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});


Recipe.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = Recipe;

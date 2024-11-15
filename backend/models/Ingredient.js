const  {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Ingredient = sequelize.define('Ingredient', {
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

    protein: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    carbs: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    fat: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
} ,
    {
        tableName: 'ingredients',
        timestamps: false,
    })

module.exports = Ingredient

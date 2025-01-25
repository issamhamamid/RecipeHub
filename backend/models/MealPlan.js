const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User')

const MealPlan = sequelize.define('MealPlan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: DataTypes.NOW, // This sets the default value to the current date
    },

    total_protein : {
        type : DataTypes.INTEGER ,
        allowNull: false
    },
    total_carbs: {
        type : DataTypes.INTEGER ,
        allowNull: false
    },
    total_calories: {
        type : DataTypes.INTEGER ,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    tableName: 'meal_plan',
    timestamps: false,
});

// Define the association with the User model
MealPlan.belongsTo(User, { foreignKey: 'user_id'});
User.hasMany(MealPlan, { foreignKey: 'user_id'});

module.exports = MealPlan;

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

     image_url: {
            type: DataTypes.STRING,
            allowNull: false,
     },

} ,
    {
        tableName: 'ingredients',
        timestamps: false,
    })

module.exports = Ingredient

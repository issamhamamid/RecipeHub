const sequelize = require('../config/database'); // Adjust this path to match your project structure
const User = require('./User');
const Recipe = require('./Recipe');
const {DataTypes} = require('sequelize')

const Favorite = sequelize.define('Favorite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
}, {
   
    tableName: 'favorites',
    timestamps: false,
});

User.belongsToMany(Recipe, { through: Favorite });
Recipe.belongsToMany(User, { through: Favorite });

module.exports = Favorite;



const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('recipehub' , 'root' , process.env.DBPASSWORD,{
    host: 'localhost',
    dialect: 'mysql'
});







module.exports = sequelize;

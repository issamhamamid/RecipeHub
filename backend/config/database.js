const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(`postgresql://postgres.kdrvnnhsykglftmzepmn:${process.env.DBPASSWORD}@aws-0-eu-west-3.pooler.supabase.com:5432/postgres`, {
    dialect: 'postgres',

});








module.exports = sequelize;

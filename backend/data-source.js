const typeorm = require('typeorm');
const User = require('./entitiy/User');
const Recipe = require('./entitiy/Recipe');
const Comment = require('./entitiy/Comment');
const Ingredient = require('./entitiy/Ingredient');
const Recipe_ingredient = require('./entitiy/Recipe_ingredient');

const dataSource = new typeorm.DataSource({
    type : "mysql",
    host : "localhost",
    port : "3306",
    username : "root",
    password : process.env.DBPASSWORD,
    database : "recipehub",
    synchronize: true,
    entities : [User ,Recipe  , Comment  , Ingredient  , Recipe_ingredient],

})


module.exports = dataSource;
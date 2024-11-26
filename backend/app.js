const express =require("express");
const app = express();
const userRouter = require("./Routes/userRouter");
const authRouter = require("./Routes/authRouter");
const passport = require("passport");
const init = require('./config/passport')
const {errorHandler} = require('./Util/errorHandler')
const recipeRouter = require("./Routes/recipeRouter");
const commentRouter = require("./Routes/commentRouter");
const favoriteRouter = require("./Routes/favoriteRouter");

init(passport)
app.use(passport.initialize());
app.use(express.json());
app.use('/users', userRouter );
app.use('/auth' ,authRouter )
app.use('/recipes' , recipeRouter)
app.use('/comments' ,commentRouter )
app.use('/favorites' , favoriteRouter)
app.use(errorHandler)


app.all('*' , (req ,res)=>{
 res.status(404).json("NOT FOUND")
})


module.exports = app;

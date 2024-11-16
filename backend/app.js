const express =require("express");
const app = express();
const userRouter = require("./Routes/userRouter");
const authRouter = require("./Routes/authRouter");
const passport = require("passport");
const init = require('./config/passport')


init(passport)
app.use(passport.initialize());
app.use(express.json());
app.use('/users', userRouter );
app.use('/auth' ,authRouter )

module.exports = app;

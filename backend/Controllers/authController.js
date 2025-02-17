const User = require('../models/User');
const responseHandler = require('../Util/responseHandler');
const {verifyPassword, hashPassword} = require('../Util/passwordHashing');
const jwt = require('jsonwebtoken');
const {asyncHandler} = require('../Util/asyncHandler')
const {syncHandler} = require('../Util/syncHandler')
const customError = require('../Error/customError')
const nodemailer = require('nodemailer');
const passport = require("passport");






module.exports.verifyUserExists = asyncHandler(async (req, res, next) => {
    const username = req.body.username;
    const user = await User.findOne({
        where: {
            username: username  // Replace with the condition you need
        }
    })

    if(user && await verifyPassword(req.body.password , user.password)){
        req.user = user;
        return next()
    }

    throw new customError(401 , 'invalid credentials , please try again');

})


module.exports.register = asyncHandler(async (req, res , next) => {

    const user = req.body;
    await User.create(user);
    const { username, email } = req.body;

    const payload = {
        username: req.body.username,
        role : req.body.role
    }

    const token = jwt.sign(payload, process.env.PRIVATE_KEY, { algorithm: 'RS256', expiresIn: '200h' });
    res.set('Authorization', token);
    responseHandler(req , res , 201 , { username, email} );

})


module.exports.login = async (req, res) => {
    const payload = {
        username: req.body.username,
        role : req.user.role,
        id : req.user.id
    }
    const token = jwt.sign(payload, process.env.PRIVATE_KEY, { algorithm: 'RS256', expiresIn: '200h' });
    res.set('Authorization', token);


    responseHandler(req , res , 200 , "");

}

module.exports.validateJwt = asyncHandler( async (req , res , next)=>{


    passport.authenticate('jwt', { session: false } , (err , user , info)=>{
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error', error: err });
        }


            responseHandler(req , res , 200 , !!user )

    }) (req, res, next);
})

module.exports.forAdmins= syncHandler((req , res  , next)=>{
    if(req.user.role === "admin"){
        return next();
    }

    throw new customError(401 , "You do not have permission to access this resource.")

})


module.exports.forgotPassword = asyncHandler(async (req , res , next)=>{
    const {username} = req.body;
    const user = await User.findOne({
        where: {
            username: username
        }
    })
    if(!user){
        throw new customError(404 , "User not found")
    }

    const payload = {
        username: req.body.username,
    }
    const token = jwt.sign(payload, process.env.PASSWORD_RESET, { expiresIn: '1h' });
    const resetLink = `http://localhost:5173/resetpass?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like Outlook, Yahoo, etc.
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASS // Your email password or app-specific password
      }
    });
    console.log(user.email)

    const mailOptions = {
      from: process.env.EMAIL, // Sender address
      to: user.email,  // Recipient address
      subject: 'Password reset',        // Subject line
      text: `Head to the following link to reset your password: ${resetLink}`,
    };

    const info = await transporter.sendMail(mailOptions);
    responseHandler(req , res , 200 , "We have sent you an email to reset your password");
    
})


module.exports.resetPassword = asyncHandler(async (req , res , next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.decode(token)
    const user = decoded ? await User.findOne({ where: {username : decoded.username} }) : null
    if(user){
        jwt.verify(token, process.env.PASSWORD_RESET);
        // await User.update(
        //     { password : hashPassword(req.body.password) },
        //     {
        //         where: {
        //             id: user.id,
        //         },
        //         individualHooks: true,
        //     },
        //
        // );

        await User.update({password : req.body.password}, {
            where: {
                id : user.id
            },
            individualHooks: true,
        });

        responseHandler(req , res , 200 , "Password reset successfully")

    }
    else {
        const err = new customError(401 , "forbidden")
        next(err)
    }

})
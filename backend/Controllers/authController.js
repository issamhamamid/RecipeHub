const User = require('../models/User');
const responseHandler = require('../Util/responseHandler');
const {verifyPassword} = require('../Util/passwordHashing');
const jwt = require('jsonwebtoken');

module.exports.register = async (req, res) => {
    const user = req.body;
    await User.create(user);
    const { username, email } = req.body;
    responseHandler(req , res , 201 , { username, email} );
}




module.exports.verifyUserExists = async (req, res, next) => {
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


}


module.exports.login = async (req, res) => {
    const payload = {
        username: req.body.username,
        role : req.user.role
    }
    const token = jwt.sign(payload, process.env.PRIVATE_KEY, { algorithm: 'RS256', expiresIn: '1h' });
    res.set('Authorization', token);


    responseHandler(req , res , 200 , "");

}
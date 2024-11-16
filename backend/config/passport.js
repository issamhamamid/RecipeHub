const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');


let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PUBLIC_KEY,
    algorithms: ['RS256'],
}

const strategy = new JwtStrategy(opts, async (payload , done)=>{
    const user = await  User.findOne({
        where :{
            username : payload.username,
        }
    })
        .then(user =>{
            if(user){
                return done(null, user)
            }
            else {
                return done(null, false);
            }

        }).catch(err =>done(err , null))

});


module.exports = (passport) => {
    passport.use(strategy);
};
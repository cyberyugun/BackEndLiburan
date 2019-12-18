const passport        = require('passport');
const JwtStrategy     = require('passport-jwt').Strategy;
const ExtractJwt      = require('passport-jwt').ExtractJwt;
const { jwtSecret }   = require('../../Config/config');
const UserDB          = require('../../../Model/user');

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};
passport.use(
  new JwtStrategy(strategyOptions, (jwt_payload, done) => {
    // const id = jwt_payload.user._id;
    const id = jwt_payload.user;
    
    
    UserDB.findById(id, ['_id',, 'email', 'name', 'status']).then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/user');


function processSignupCallback(request, email, password, done) {
  // first search to see if a user exists in our system with that email
  UserModel.findOne({
    where: {
      'email' :  email
    },
    attributes: ['id']
  })
  .then(function(user) {
    if (user) {
      // user exists call done() passing null and false
      return done(null, false);
    } else {
      // create the new user
      const userToCreate = request.body; // make this more secure, VALIDATE and CLEAN

      bcrypt.hash(userToCreate.password, 10, (err, hash) => {
        userToCreate.password = hash;
        UserModel.create(userToCreate)
        .then(function(createdRecord) {
            createdRecord.password = undefined;
            return done(null, createdRecord);
        });
      });
    } 
  });
}

function processLoginCallback(email, password, done) {
  // first let's find a user in our system with that email
  UserModel.findOne({
    where: {
      'email' :  email
    } 
  })
  .then(function(user) {
    if (!user) {
        return done(new Error('user not found'), null)
    }
    // make sure the password they provided matches what we have
    // (think about this one, before moving forward)
    bcrypt.compare(password, user.password, function(err, result) {
        user.password = undefined;
        return result ? done(null, user) : done(null, false);
    });
  }); 
}

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, processSignupCallback));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
  }, processLoginCallback));
};
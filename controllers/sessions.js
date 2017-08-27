module.exports.new = function(request, response, next, passport) {
  passport.authenticate('local-login', { 
      successRedirect: '/',
      failureRedirect: '/login'
  })(request, response, next)
}

module.exports.login = function(request, response) {
  response.render('login');
}

module.exports.logout = function(request, response) {
  request.logout();
  response.redirect('/');
}

// simple middleware for routes that should be authenticated
module.exports.isAuthenticated = function(request, response, next){
  if(request.user) {
    return next();
  } else {
    response.redirect('/login');
  }
}
module.exports.new = function(request, response, err, user) {
  if (err) {
    return response.render('login', {error: 'User not found'});
  }

  response.redirect('/');
}

module.exports.login = function(request, response) {
  response.render('login');
}

module.exports.isAuthenticated = function(request, response, next){
  if(request.user) {
    return next();
  } else {
    response.redirect('/login');
  }
}
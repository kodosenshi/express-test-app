module.exports.new = function(request, response) {
  response.render('new-user');
}

module.exports.create = function(request, response, next, passport) {
  passport.authenticate('local-signup', (err, user) => {
    if (err) {
      return response.render('new-user', {error: err});
    }
    if (!user) {
      return response.render('new-user', {error: new Error('Please check email and password')});
    }
    response.redirect('/login');
  })(request, response, next);
}
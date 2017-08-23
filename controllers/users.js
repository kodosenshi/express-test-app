module.exports.new = function(request, response) {
  response.render('new-user');
}

module.exports.create = function(request, response, err) {
  if (err) {
    return response.render('new-user', {error: err});
  }
  response.redirect('/login');
}
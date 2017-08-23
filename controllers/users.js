module.exports.new = function(request, response) {
  response.json({user: request.user})
}
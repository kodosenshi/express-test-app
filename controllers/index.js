const articles = require('../models/articles');

module.exports = function(app) {
	app.get('/', (request, response) => {
			response.render('index', {articles: articles}) ;
	});
}
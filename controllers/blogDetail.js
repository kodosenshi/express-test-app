const articles = require('../models/articles');

module.exports = function(app) {
	const links = articles.map((article) => {
										return { 
												title: article.title, 
												link: article.link
										}
								});

	articles.forEach((article) => {
			app.get(article.link, (request, response) => {
					response.render('blog-detail', {
							article: article, 
							links: links
					});
			});
	})
}


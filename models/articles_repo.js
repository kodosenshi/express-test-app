const del = require('delete');
const Article = require('./articles');

// =================================================
// SAVE A NEW ARTICLE
const save = function(data, callback) {
  const regex = /(&nbsp;|<([^>]+)>)/ig;

   Article.create({
      uploaded: data.uploaded || false,
      title: data.title,
      image: data.url,
      description: data.body.replace(regex, "").substr(0, 200),
      body: data.body
    }).then(res => {
      callback(null, res);
    }, err => {
      callback(err);
    });
}

// =================================================
// DELETE AN ARTICLE
const deleteArticleById = function(id, callback) {
  this.getArticleById(id, (err, article) => {
    if (err) {
      return callback(err);
    }
    article.destroy().then(() => {
      if (article.uploaded) {
        del(`public/${article.image}`).then(() => {
          callback(null);
        })
      } else {
        callback(null);
      }
    }, err => {
      callback(err);
    });
  })
}

// =================================================
// GET ALL ARTICLES
const get = function(callback) {
  Article.findAll().then(articles => {
    callback(null, articles);
  }, err => {
    callback(err);
  });
}

// =================================================
// GET 1 ARTICLE BY ID
const getArticleById = function(id, callback) {
  Article.findById(id).then(article => {
    callback(null, article);
  }, err => {
    callback(err);
  });
}

module.exports.save = save;
module.exports.get = get;
module.exports.getArticleById = getArticleById;
module.exports.deleteArticleById = deleteArticleById;
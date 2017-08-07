//https://www.npmjs.com/package/jsonfile
const jsonfile = require('jsonfile');

//https://node-postgres.com/
// https://node-postgres.com/guides/project-structure

const pg = require('../db');

// =================================================
// SAVE A NEW ARTICLE
const save = function(data, callback) {
  const regex = /(&nbsp;|<([^>]+)>)/ig;
  const articleInsert = [
                          data.title, 
                          data.url, 
                          data.body, 
                          data.body.replace(regex, "").substr(0, 200)
                        ];

  const insertSql = 'INSERT INTO articles(title, image, body, description) VALUES ($1, $2, $3, $4)';

  pg.query(insertSql, articleInsert, (err, res) => {
    callback(err, res);
  })
}

// =================================================
// DELETE AN ARTICLE
const deleteArticleById = function(id, callback) {
  pg.query('delete from articles where id = $1', [id], (err, res) => {
    callback(err, res);
  })
}

// =================================================
// GET ALL ARTICLES
const get = function(callback) {
  pg.query('select * from articles', null, (err, res) => {
    if (err) {
      callback(err)
    } else {
      callback (null, res.rows)
    }
  })
}

// =================================================
// GET 1 ARTICLE BY ID
const getArticleById = function(id, callback) {
  pg.query('select * from articles where id = $1 limit 1', [id], (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.rows[0])
    }
  })
}

module.exports.save = save;
module.exports.get = get;
module.exports.getArticleById = getArticleById;
module.exports.deleteArticleById = deleteArticleById;
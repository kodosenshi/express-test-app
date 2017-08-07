const pg = require('pg');

const client = new pg.Pool({
  user: 'shauncollins',
  host: '127.0.0.1',
  database: 'blog',
  password: '',
  port: 5432,
});

module.exports.query = (queryString, queryParameters, callback) => {
  client.query(queryString, queryParameters, (err, res) => {
    callback(err, res);
  })
}

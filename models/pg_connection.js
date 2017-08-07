const pg = require('pg');


module.exports.client = new pg.Client({
  user: 'shauncollins',
  host: '127.0.0.1',
  database: 'blog',
  password: '',
  port: 5432,
});

module.exports.client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to pg')
  }
})


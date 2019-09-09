require('dotenv').config();
const pg = require('pg');

// pick variables from env
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
// run a select query
// pool
//   .query('SELECT * FROM snippet')
//   .then(res => {
//     console.table(res.rows);
//   }).catch(err => {
//     console.error(err);
//   })
//   .finally(() => {
//     pool.end();
//   });
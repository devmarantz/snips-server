require('dotenv').config();
const pg = require('pg');

// pick variables from env
const {DB_USER, DB_PW, DB_HOST, DB_PORT, DB_NAME } = process.env;
const connectionString = `postgresql://${DB_USER}:${DB_PW}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const pool = new pg.Pool({connectionString});

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
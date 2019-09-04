require('dotenv').config();
const pg = require('pg');

const {DB_USER, DB_PW, DB_HOST, DB_PORT, DB_NAME } = process.env;
const connectionString = `postgresql://${DB_USER}:${DB_PW}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const client = new pg.Client(connectionString);

// opens a single connection to the database
client.connect();

// run a select query
client
  .query('SELECT * FROM snippet')
  .then(res => {
    console.log(res.rows);
  }).catch(err => {
    console.error(err);
  })
  .finally(() => {
    client.end();
  });
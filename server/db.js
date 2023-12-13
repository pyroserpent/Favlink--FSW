const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',    // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'linksapi',    // The name of your database
  password: 'afnan', // Replace with your PostgreSQL password
  port: 5432,              // The port PostgreSQL is running on (default is 5432)
});
module.exports = pool;
const getLinks = (req, res) => {
    pool.query('SELECT * FROM favlinks ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  };
  module.exports = {
    getLinks,
  };
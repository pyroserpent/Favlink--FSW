const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',    
  host: 'localhost',
  database: 'linksapi',    // The name of your database
  password: 'afnan', // Replace with your PostgreSQL password
  port: 5432,              // The port PostgreSQL is running on (default is 5432)
});
const addLink = (request, response) => {
    const { name, url } = request.body;
    pool.query('INSERT INTO favlinks (name, url) VALUES ($1, $2) RETURNING *', [name, url], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Link added with ID: ${results.rows[0].id}`);
    });
  };
  
  const addLink = (request, response) => {
    const { name, url } = request.body;
    pool.query('INSERT INTO favlinks (name, url) VALUES ($1, $2) RETURNING *', [name, url], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Link added with ID: ${results.rows[0].id}`);
    });
  };

  const updateLink = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, url } = request.body;
  
    pool.query(
      'UPDATE favlinks SET name = $1, url = $2 WHERE id = $3 RETURNING *',
      [name, url, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(`Link modified with ID: ${id}`);
      }
    );
  };
  const deleteLink = (request, response) => {
    const id = parseInt(request.params.id);
  
    pool.query('DELETE FROM favlinks WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Link deleted with ID: ${id}`);
    });
  };  

module.exports = {
  pool,
  getLinks,
};

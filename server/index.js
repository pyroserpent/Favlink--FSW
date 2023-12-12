const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const pool = require('./db');

app.use(express.json());

// Set the path for the client files
const clientPath = path.join(__dirname, '..', 'client/dist');
app.use(express.static(clientPath));

app.get('/', (req, res) => {
    // Serve the index.html file
    res.sendFile(path.join(clientPath, 'index.html'));
});
app.get('/favlinks', async (req, res) => {
    try {
      const allLinks = await pool.query("SELECT * FROM favlinks");
      res.json(allLinks.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  

// Start the server

app.post('/api/links', async (req, res) => {
    try {
      const { name, url } = req.body;
      const newLink = await pool.query("INSERT INTO favlinks (name, url) VALUES ($1, $2) RETURNING *", [name, url]);
      res.json(newLink.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  app.put('/api/links/:id', async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the URL
      const { name, url } = req.body; // Get the new name and URL from the request body
  
      const updateLink = await pool.query(
        "UPDATE favlinks SET name = $1, url = $2 WHERE id = $3 RETURNING *",
        [name, url, id]
      );
  
      if (updateLink.rows.length === 0) {
        return res.status(404).json("Link not found");
      }
  
      res.json(updateLink.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  app.delete('/api/links/:id', async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the URL
      const deleteLink = await pool.query("DELETE FROM favlinks WHERE id = $1 RETURNING *", [id]);
  
      if (deleteLink.rows.length === 0) {
        return res.status(404).json("Link not found");
      }
  
      res.json("Link was deleted");
    } catch (err) {
      console.error(err.message);
    }
  });
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});   

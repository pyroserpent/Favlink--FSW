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
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
app.post('/api/links', async (req, res) => {
    try {
      const { name, url } = req.body;
      const newLink = await pool.query("INSERT INTO favlinks (name, url) VALUES ($1, $2) RETURNING *", [name, url]);
      res.json(newLink.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  

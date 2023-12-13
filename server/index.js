const express = require('express');
const db = require('./db');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json()); // This should be placed before your routes

// API Routes
app.get('/api/links', db.getLinks);
app.post('/api/links', db.addLink);
app.put('/api/links/:id', db.updateLink);
app.delete('/api/links/:id', db.deleteLink);

// Set the path for the client files
const clientPath = path.join(__dirname, '..', 'client/dist');
app.use(express.static(clientPath));

app.get('/', (req, res) => {
    // Serve the index.html file
    res.sendFile(path.join(clientPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

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

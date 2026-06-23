const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

module.exports = app;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Serve static files from public directory
app.use(express.static('public'));

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);



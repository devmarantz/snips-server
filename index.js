const express = require('express');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');

const app = express();

// Adds the router middleware
app.use(express.json()); //parse request with JSON bodies
app.use(logger);
app.use(router);

app.listen(5000, () => {
  console.log('Snips server running on Port 5000');
});

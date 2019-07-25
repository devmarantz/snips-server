const express = require('express');
const router = require('./routes');

const app = express();

// Adds the router middleware
app.use(router);

app.listen(5000, () => {
  console.log('Snips server running on Port 5000');
});

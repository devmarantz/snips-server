const express = require('express');
const cors = require('cors');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');

const errorHandler = require('./middleware/errorHandler');

const app = express();

// Adds the router middleware
app.use(cors());
app.use(express.json()); //parse request with JSON bodies
app.use(logger);
app.use(router);
app.use(errorHandler);

module.exports = app;
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const { requestLogger } = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');
const db = require('./database');

const app = express();

// Connect to fake in-memory mongodb
db.connect();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Logger
app.use(requestLogger);
// API routes
app.use('/api/v1/', routes);
// Handle not found routes
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Error Handler
app.use(errorHandler);

app.listen(config.server.port, () => {
  console.log(`Server is running at port ${config.server.port}`);
});

const express = require('express');
const bodyParser = require('body-parser');

config = require('./config');
const { requestLogger } = require('./middleware/requestLogger');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Logger
app.use(requestLogger);

app.listen(config.server.port, () => {
  console.log(`Server is running at port ${config.server.port}`);
});

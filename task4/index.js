const express = require('express');
const logger = require('./logger');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  logger.info('Received a request.');
  res.send('Hello, World!');
});


app.get('/error', (req, res, next) => {
  logger.error('Simulated error occurred.');
  next(new Error('Simulated error'));
});


app.use((err, req, res, next) => {
  logger.error(`An error occurred: ${err.message}`);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

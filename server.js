const path = require('path');
const express = require('express');

const ENV = process.env.NODE_ENV || 'dev';
const PORT = process.env.PORT || 8080;

const app = express();

const staticIndex = path.join(
  __dirname,
  '/build',
);

app.use(express.static(staticIndex));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
  });
});

const server = app.listen(PORT, () => {
  console.log(`ENV: ${ ENV } | listening on port ${ PORT }`);
});

server.on('error', (err) => {
  console.error(err);
});

app.get('/status', (req, res) => {
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(staticIndex, '/index.html'));
});

module.exports = app;

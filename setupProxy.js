const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/__',
    proxy({
      target: 'http://localhost:4000'
    })
  );
};

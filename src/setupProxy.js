const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    'masters',
    createProxyMiddleware({
      target: 'http://192.168.70.210:9080',
      changeOrigin: true,
    })
  );
};
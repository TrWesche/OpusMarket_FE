const { createProxyMiddleware } = require('http-proxy-middleware');

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: BASE_URL,
      changeOrigin: true,
      cookieDomainRewrite: {
          "https://opusmarket-backend.herokuapp.com/": "https://opusmarket-frontend.herokuapp.com/",
          "*": ""
      }
    })
  );
};
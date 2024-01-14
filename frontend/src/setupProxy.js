const { createProxyMiddleware } = require('http-proxy-middleware')
console.log('testing connection')
module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api/V1/", { target: "http://localhost:5500/", secure: false, })
    );
};
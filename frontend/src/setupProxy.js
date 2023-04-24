const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use('/', createProxyMiddleware({
        target: 'https://adopt-a-cat.onrender.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            '^/': '/cats'
        },
    }))
}
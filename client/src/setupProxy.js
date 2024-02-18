const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = (app) => {
    app.use('/cards', createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
    }))
}
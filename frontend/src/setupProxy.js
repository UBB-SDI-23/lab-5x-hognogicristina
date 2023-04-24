import { createProxyMiddleware } from 'http-proxy-middleware'

export default function (app) {
    app.use('/cats', createProxyMiddleware({
        target: 'https://adopt-a-cat.onrender.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            '^/cats': ''
        },
    }))
}

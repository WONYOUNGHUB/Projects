const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware(
            ['/main',
            '/member',
            '/advertisement',
            '/coupon',
            '/favorites',
            '/location',
            '/menucategory',
            '/menu',
            '/noticeboard',
            '/order',
            '/ordergroup',
            '/review',
            '/reviewrecommend',
            '/shop',
            '/image',], 
        {
            target: 'http://localhost:7777',
            changeOrigin: true
        })
    );
};
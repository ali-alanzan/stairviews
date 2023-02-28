const express = require('express');
const next = require('next');
const {createProxyMiddleware} = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare()
    .then(() => {
        const server = express();
        // apply proxy in dev mode
    if(dev) {
        server.use('/api', createProxyMiddleware({
            target: process.env.NEXT_PUBLIC_URL,
            changeOrigin: true
        }))
    }

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(process.env.PORT || 3000, (err) => {
        if(err) {
            throw err;
        }
       console.log('>Ready on '+process.env.NEXT_PUBLIC_URL)
    })
})
.catch(err => {
    console.log("Error", err)
});
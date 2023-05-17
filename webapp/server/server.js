import { handler } from '../build/handler.js';
import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';


let httpPort = 3000;
let httpsPort = 3500;

let httpsOptions = {}
let start_https = false;
if (fs.existsSync('./server/cert.crt')){
    httpsOptions = {
        cert: fs.readFileSync('./server/cert.crt'),
        ca: fs.readFileSync('./server/cert.ca-bundle'),
        key: fs.readFileSync('./server/cert.key')
    }
    start_https = true;
}

let app = express();
let httpServer = http.createServer(app)

let httpsServer;
if (start_https) httpsServer = https.createServer(httpsOptions, app);

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (_, res) => {
    res.end('ok');
});

app.use((req, res, next) => {
    if(req.protocol === 'http' && start_https == true) {
        console.log("Redirecting to https")
        res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
});


app.use(handler);
httpServer.listen(httpPort);
console.log("Http server listening on port " + httpPort);
if (start_https == true) httpsServer.listen(httpsPort), console.log("Https listening on port " + httpsPort);;


process.on('SIGTERM', () => {
    httpsServer.close()
    if (start_https == true) httpServer.close()
})
const express = require('express');
const http = require('http');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));

// Look at the this folder (public folder) to serve static html files
app.use(express.static(__dirname+ '/public'))

// req = request
// res = result
// next = Is used when you need to invoke additional 
// middleware to take care of work on your behalf.
// Next is optional
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
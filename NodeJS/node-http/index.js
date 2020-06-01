//Imports
const http = require('http');
const fs = require('fs');
const path = require('path');

//Hostname
const hostname = 'localhost';
//Port
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
    console.log("Request for " + req.url + ' by method ' + req.method);

    // If request method is get
    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        // Set the file path
        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);

        // If file extention is html
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                // If the file does not exist
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404: ' + fileUrl +
                        ' not found</h1></body></html>');
                    return;
                }
                // If file exist, show file
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else {
            // File extention is not html
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl +
                ' not a HTML file</h1></body></html>');
        }
    }
    else {
        // If request method is not get
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method +
            ' not supported</h1></body></html>');
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
});
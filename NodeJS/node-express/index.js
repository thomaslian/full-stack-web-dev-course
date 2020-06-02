const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
// Allows us to parse the body of the request messages which is formatted in json
app.use(bodyParser.json());

app.all('/dishes', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');

    // Contine to look for additional specifications below which will 
    // match the dishes endpoint. Example a app.get('/dishes') if it is
    // one below. All properties will be the same as the ones that 
    // are set in this one.
    next();
});

// Get dishes
app.get('/dishes', (req,res,next) => {
    res.end('Will send all the dishes to you!');
})

// Post new dish
app.post('/dishes', (req,res,next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

// Update an existing dish (not supported)
app.put('/dishes', (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
});

// Delete dishes
app.delete('/dishes', (req,res,next) => {
    res.end('Deleting all the dishes!');
})

// Get dish with ID
app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
})

// Post new dish with ID (not supported)
app.post('/dishes/:dishId', (req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

// Update an existing dish with ID
app.put('/dishes/:dishId', (req,res,next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + " with details: " + req.body.description);
});

// Delete dish with ID
app.delete('/dishes/:dishId', (req,res,next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});


// Look at the this folder (public folder) to serve static html files
app.use(express.static(__dirname+ '/public'));

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
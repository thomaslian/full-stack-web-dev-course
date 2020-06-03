const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// Declare the endpoint at one single location
dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');

    // Contine to look for additional specifications below which will 
    // match the dishes endpoint. Example a app.get('/dishes') if it is
    // one below. All properties will be the same as the ones that 
    // are set in this one.
    next();
})
// Get dishes
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
// Post new dish
.post((req,res,next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
// Update an existing dish (not supported)
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
// Delete dishes
.delete((req,res,next) => {
    res.end('Deleting all the dishes!');
});

dishRouter.route('/:dishId')
// Get dish with ID
.get((req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
})
// Post new dish with ID (not supported)
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId);
})
// Update an existing dish with ID
.put((req,res,next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + " with details: " + req.body.description);
})
// Delete dish with ID
.delete((req,res,next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

module.exports = dishRouter;
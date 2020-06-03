const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

// Declare the endpoint at one single location
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');

    // Contine to look for additional specifications below which will 
    // match the promotions endpoint. Example a app.get('/promotions') if it is
    // one below. All properties will be the same as the ones that 
    // are set in this one.
    next();
})
// Get promotions
.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})
// Post new promotion
.post((req,res,next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
// Update an existing promotion (not supported)
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
// Delete promotions
.delete((req,res,next) => {
    res.end('Deleting all the promotions!');
});

promoRouter.route('/:promoId')
// Get promotion with ID
.get((req,res,next) => {
    res.end('Will send details of the promotion: ' + req.params.promoId + ' to you!');
})
// Post new promotion with ID (not supported)
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
// Update an existing promotion with ID
.put((req,res,next) => {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + " with details: " + req.body.description);
})
// Delete promotion with ID
.delete((req,res,next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});

module.exports = promoRouter;
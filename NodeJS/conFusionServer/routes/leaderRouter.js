const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

// Declare the endpoint at one single location
leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');

    // Contine to look for additional specifications below which will 
    // match the leaders endpoint. Example a app.get('/leaders') if it is
    // one below. All properties will be the same as the ones that 
    // are set in this one.
    next();
})
// Get leaders
.get((req,res,next) => {
    res.end('Will send all the leaders to you!');
})
// Post new leader
.post((req,res,next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
// Update an existing leader (not supported)
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
// Delete leaders
.delete((req,res,next) => {
    res.end('Deleting all the leaders!');
});

leaderRouter.route('/:leaderId')
// Get leader with ID
.get((req,res,next) => {
    res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
})
// Post new leader with ID (not supported)
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
// Update an existing leader with ID
.put((req,res,next) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + " with details: " + req.body.description);
})
// Delete leader with ID
.delete((req,res,next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;
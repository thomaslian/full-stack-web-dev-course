const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

// LEADERS
// Declare the endpoint at one single location
leaderRouter.route('/')
    // Get leaders
    .get((req, res, next) => {
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                // Send the leaders back as a json value
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Post new leader
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        // req.body includes the new leader, so use it as a parameter
        Leaders.create(req.body)
            .then((leader) => {
                console.log('Leader created ', leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Update an existing leader (not supported)
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    // Delete leaders
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// LEADER WITH ID
leaderRouter.route('/:leaderId')
    // Get leader with ID
    .get((req, res, next) => {
        // Leader id is already in the params
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                // Send the leader back as a json value
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Post new leader with ID (not supported)
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })
    // Update an existing leader with ID
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Delete leader with ID
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = leaderRouter;
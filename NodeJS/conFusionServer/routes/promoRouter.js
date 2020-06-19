const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

// PROMOTIONS
// Declare the endpoint at one single location
promoRouter.route('/')
    // Get promotions
    .get((req, res, next) => {
        Promotions.find({})
            .then((promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                // Send the promotions back as a json value
                res.json(promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Post new promotion
    .post(authenticate.verifyUser, (req, res, next) => {
        // req.body includes the new Promotion, so use it as a parameter
        Promotions.create(req.body)
            .then((Promotion) => {
                console.log('Promotion created ', Promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Update an existing promotion (not supported)
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    // Delete promotions
    .delete(authenticate.verifyUser, (req, res, next) => {
        Promotions.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

// PROMOTION WITH ID
promoRouter.route('/:promoId')
    // Get promotion with ID
    .get((req, res, next) => {
        // Promotion id is already in the params
        Promotions.findById(req.params.promoId)
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                // Send the promotion back as a json value
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Post new promotion with ID (not supported)
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    // Update an existing promotion with ID
    .put(authenticate.verifyUser, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, { new: true })
            .then((promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Delete promotion with ID
    .delete(authenticate.verifyUser, (req, res, next) => {
        Promotions.findByIdAndRemove(req.params.promoId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });

module.exports = promoRouter;
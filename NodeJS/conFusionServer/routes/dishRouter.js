const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// Declare the endpoint at one single location
dishRouter.route('/')
    // Get dishes
    .get((req, res, next) => {
        Dishes.find({})
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                // Send the dishes back as a json value
                res.json(dishes);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Post new dish
    .post((req, res, next) => {
        // req.body includes the new dish, so use it as a parameter
        Dishes.create(req.body)
            .then((dish) => {
                console.log('Dish created ', dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Update an existing dish (not supported)
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })
    // Delete dishes
    .delete((req, res, next) => {
        Dishes.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

dishRouter.route('/:dishId')
    // Get dish with ID
    .get((req, res, next) => {
        // Dish id is already in the params
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                // Send the dish back as a json value
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Post new dish with ID (not supported)
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.dishId);
    })
    // Update an existing dish with ID
    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true })
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    // Delete dish with ID
    .delete((req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = dishRouter;
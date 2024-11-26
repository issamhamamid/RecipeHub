const favoriteController = require('../Controllers/favoriteController');
const express = require('express');
const authController = require('../Controllers/authController');
const passport = require('passport');


const favoriteRouter = express.Router();

favoriteRouter.route('/:id')
    .post(passport.authenticate('jwt', { session: false }) ,favoriteController.addFavorite)


module.exports = favoriteRouter
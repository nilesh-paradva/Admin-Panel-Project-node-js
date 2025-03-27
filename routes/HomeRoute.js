const express = require('express');
const HomeRote = express.Router();
const auth = require('../middleware/AuthMiddleware');
const UserGet = require('../middleware/UserGet');

const HomeController = require('../controllers/HomeController');

HomeRote.get('/', auth.AuthSecure, UserGet.attachUser, HomeController.HomeController);

module.exports = HomeRote;
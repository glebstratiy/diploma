const express = require('express');
const { about } = require('../controllers/about.controller');


const aboutrouter = express.Router();

aboutrouter.use('/', about);

module.exports = aboutrouter;
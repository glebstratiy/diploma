const express = require('express');
const { getServices } = require('../controllers/service.controller');

const serviceRouter = express.Router();

serviceRouter.use('/', getServices);

module.exports = serviceRouter;
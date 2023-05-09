const express = require('express');
const { appointment, success } = require('../controllers/appointment.controller');


const appointmentRouter = express.Router();

appointmentRouter.use('/', appointment)

module.exports = appointmentRouter;
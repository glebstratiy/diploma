const express = require('express');
const { getDoctors, getDoctor } = require("../controllers/doctors.controller");

const doctorRouter = express.Router();

doctorRouter.use('/:id', getDoctor);
doctorRouter.use('/', getDoctors);

module.exports = doctorRouter;
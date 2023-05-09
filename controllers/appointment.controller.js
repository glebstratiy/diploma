const Doctor = require('../models/doctor.model');
const Service = require('../models/service.model');

exports.appointment = async (req, res) => {
  const token = req.cookies.token;
  const doctorsFromDB = await Doctor.find();
  const servicesFromDB = await Service.find();
  res.render("../views/appointment/appointment.hbs", { doctors: doctorsFromDB, services: servicesFromDB, isLoggedIn: token });
}

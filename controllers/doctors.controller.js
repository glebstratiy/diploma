const Doctor = require('../models/doctor.model')

exports.getDoctors = async (req, res) => {
  const token = req.cookies.token;
  const doctorsFromDB = await Doctor.find();
  res.render("../views/doctors/doctors.hbs", { doctors: doctorsFromDB, isLoggedIn: token });
}

exports.getDoctor = async (req, res) => {
    try {
        const token = req.cookies.token;
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
          return res.status(404).send('Doctor not found');
        }
        res.render('../views/doctors/doctor.hbs', { doctor: doctor, isLoggedIn: token });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
  }
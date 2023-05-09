const Service = require("../models/service.model");

exports.getServices = async (req, res) => {
  try {
    const token = req.cookies.token;
    const servicesFromDB = await Service.find();
    res.render("../views/services/services.hbs", { services: servicesFromDB, isLoggedIn: token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


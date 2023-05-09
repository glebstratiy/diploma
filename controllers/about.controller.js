exports.about = async (req, res) => {
  const token = req.cookies.token;
    res.render("../views/about/about.hbs", { isLoggedIn: token });
  }
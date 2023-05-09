exports.contacts = async (req, res) => {
    const token = req.cookies.token;
    res.render("../views/contacts/contacts.hbs", { isLoggedIn: token });
  }
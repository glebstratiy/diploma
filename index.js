const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');
const hbs = require('hbs')
const User = require('./models/user.model')
const doctorRouter = require('./routes/doctors.route');
const appointmentRouter = require('./routes/appointment.route');
const authRouter = require('./routes/auth.route');

const app = express();
const PORT = 3001;

//Reusable navbar
const navbar = fs.readFileSync('views/nav.hbs', 'utf-8')
hbs.handlebars.registerPartial('nav', navbar)
//Reusable footer
const footer = fs.readFileSync('views/footer.hbs', 'utf-8')
hbs.handlebars.registerPartial('footer', footer)

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
const authMiddleware = require('./middlewares/jwt.middleware');
const accRouter = require('./routes/account.route');
const serviceRouter = require('./routes/service.route');
const aboutrouter = require('./routes/about.route');
const contactsRouter = require('./routes/contacts.route');


//Routes
app.use('/doctors', doctorRouter)
app.use('/auth', authRouter)
app.use('/appointment', authMiddleware, appointmentRouter)
app.use('/account', authMiddleware, accRouter)
app.use('/services', serviceRouter)
app.use('/about', aboutrouter)
app.use('/contacts', contactsRouter)

app.get('/', (req, res) =>{
  const token = req.cookies.token;
  res.render('index.hbs', { isLoggedIn: token });
})


app.post('/doAppointment', async (req, res) =>{
  const decodedToken = jwt.decode(req.cookies.token, { complete: true })
  const username = decodedToken.payload.username;
  const user = await User.findOne({ username });
  await user.appointments.push(req.body);
  await user.save();
  res.redirect('/account')  
})

app.post('/deleteAppointment', async (req, res) =>{
  const id = req.body.id;
  const appointmentObjectId = new mongoose.Types.ObjectId(id);
  const decodedToken = jwt.decode(req.cookies.token, { complete: true });
  const username = decodedToken.payload.username;
  const user = await User.findOne({ username });
  const arr = user.appointments.filter(app => app._id.toString() !== appointmentObjectId.toString());
  await User.findOneAndUpdate(username, { appointments: arr });
  res.redirect('/account')  
})

mongoose.connect("mongodb+srv://gstratiyj:goliylox123@cluster0.zvp2y32.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.listen(PORT, () => {console.log(`App running on port ${PORT}`)});



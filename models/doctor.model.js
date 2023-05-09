const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    required: true
  }
})

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor;
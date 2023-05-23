const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    unique: true,
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctors',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patients',
    required: true
  },
  appointmentDate:{
    type:String,
    required:true
  },
  appointmentTime: {
    type: String,
    required: true
  }
},{
    timestamps:true
});



const Appointment = mongoose.model('appointments', appointmentSchema);

module.exports = Appointment;

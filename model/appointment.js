const mongoose = require('mongoose');
const multer=require('multer')
const path=require('path')
const IMAGE_PATH=path.join('/prescription')

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    unique: true,
    required: true
  },
  patient_name:{
    type:String,
    required:true
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
  },
  patient_phone:{
    type:String,
    required:true
  },
  prescription:{
    type:String,
    
  }
},{
    timestamps:true
});
let storage=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,path.join(__dirname,'../','/uploads',IMAGE_PATH))
  },
  filename:(req,file,cb)=>{
      cb(null,file.fieldname+'-'+req.user.id+'-'+Date.now()+'.png')
  }
})
appointmentSchema.statics.uploadedImg=multer({storage:storage}).single('image')
appointmentSchema.statics.IMAGE_PATH=IMAGE_PATH



const Appointment = mongoose.model('appointments', appointmentSchema);

module.exports = Appointment;

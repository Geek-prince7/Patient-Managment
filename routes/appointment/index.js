const express=require('express')
const router=express.Router()
const passport=require('passport')
const Doctor=require('../../model/doctors')
const Appointment=require('../../model/appointment')

const authenticatePatient = (req, res, next) => {
    passport.authenticate('patient-jwt', { session: false }, (err, patient, info) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      if (!patient) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // Authentication successful, proceed to the next middleware or route handler
      req.patient = patient; // Store the authenticated doctor in the request object
      next();
    })(req, res, next);
  };



// Add Appointment API Route
router.post('/new',authenticatePatient , async (req, res) => {
    try {
      const { doctorId, appointmentTime,appointmentDate } = req.body;
  
      // Find the doctor by ID and populate the slot field
      const doctor = await Doctor.findById(doctorId).populate('slot');
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
    //   console.log(doctor)
      // Check if the appointment time is within the doctor's slot start time and end time
      const slotStart =doctor.slot.startTime;
      const slotEnd = doctor.slot.endTime;
      const time=appointmentTime.split(':')
      const appointmentExists=await Appointment.findOne({appointmentTime:appointmentTime,appointmentDate:appointmentDate,patient:req.patient})
      if(appointmentExists){
        return res.status(421).json({
            code:1002,
            message:'bad request | appointment already exist at that time'
        })
      }
      
      const lastAppointment=await Appointment.find({doctor:doctorId},{},{sort:{createdAt:-1}})
      let id
      console.log('last appointment',lastAppointment)
      if(!lastAppointment || lastAppointment.length==0){
        id=`APPOINT_100001`


      }
      else{
        let val=lastAppointment[0].appointmentId.split('_')
        console.log(val)
        let count=parseInt(val[1])
        count+=1
        console.log(count)
        id=`${val[0]}_${count}`

      }
      
      if (
        Number(time[0]) < Number(slotStart.split(':')[0]) ||
        Number(time[0]) >= Number(slotEnd.split(':')[0])
      ) {
        return res.status(400).json({ message: 'Invalid appointment time' });
      }
  
      // Create the appointment
      const appointment = new Appointment({
        appointmentId:id,
        doctor: doctorId,
        patient: req.patient._id,
        appointmentTime:appointmentTime,
        appointmentDate:appointmentDate
      });
  
      // Save the appointment
      const savedAppointment = await appointment.save();
  
      res.status(201).json({code:1000,data:savedAppointment});
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({code:1001,message: 'An error occurred' });
    }
  });


  /** ---------------get all apppointment of a patient ------------------ */
  router.get('/all',authenticatePatient,async(req,resp)=>{
    try {
      let appointments=await Appointment.find({patient:req.patient})
      return resp.status(200).json({
        code:1000,
        message:'success',
        data:appointments
      })

      
    } catch (error) {
      console.log(error)
        return resp.status(500).json({
            code:1001,
            message:"internal server error"
        })
      
    }
  })

  module.exports=router
  
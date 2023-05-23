const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const Patient=require('../../model/patient')
const passport = require('passport')


// Doctor authentication middleware
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
  

router.get('/',(req,resp)=>{
    resp.status(200).json({
        code:1000,
        message:'hello patient from server'
    })
})



/** --------------------- Register new Patient ------------------------------------ */
router.post('/register',async(req,resp)=>{
    try {
        const patient=await Patient.create({email:req.body.email,name:req.body.name,password:req.body.password,age:req.body.age,phone_no:req.body.phone_no})
        resp.status(200).json({
            code:1000,
            message:'success',
            data:patient
        })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            code:1001,
            message:"internal server error"
        })
        
    }
})

/** ----------------------Patient login -------------------------------------------- */
router.post('/login',async(req,resp)=>{
    try {
        const patient=await Patient.findOne({email:req.body.email})
        if(!patient || patient.password!=req.body.password){
            return resp.status(401).json({
                code:1002,
                message:"invalid email/password"
            })
        }
        const payload={data:patient}
        const options={
            subject:patient.email,
            expiresIn:1000*3600
        }
        return resp.status(200).json({
            code:1000,
            message:'login success | keep your token',
            data:{
                token:jwt.sign(payload,'pms11',options)
            }
        })
        
        
    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            code:1001,
            message:"internal server error"
        })
        
    }
})

router.get('/info',authenticatePatient,async(req,resp)=>{
    try {
        let patient=await Patient.findById(req.patient._id).select('-password')
        return resp.status(200).json({
            code:1000,
            message:'success',
            data:patient
        })
        
    } catch (error) {
        return resp.status(500).json({
            code:1001,
            message:"internal server error"
        })
        
    }
})
module.exports=router
const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const Doctor=require('../../model/doctors')
const specialization=require('../../model/specilization')
router.get('/',(req,resp)=>{
    resp.status(200).json({
        code:1000,
        message:'hello doctor from server'
    })
})

/** --------------------- Register new doctor ------------------------------------ */
router.post('/register',async(req,resp)=>{
    try {
        const doctor=await Doctor.create({email:req.body.email,name:req.body.name,password:req.body.password,experience:req.body.experience,speciality:req.body.speciality})
        resp.status(200).json({
            code:1000,
            message:'success',
            data:doctor
        })
    } catch (error) {
        return resp.status(500).json({
            code:1001,
            message:"internal server error"
        })
        
    }
})

/** ----------------------Doctor login -------------------------------------------- */
router.post('/login',async(req,resp)=>{
    try {
        const doctor=await Doctor.findOne({email:req.body.email})
        if(!doctor || doctor.password!=req.body.password){
            return resp.status(401).json({
                code:1002,
                message:"invalid email/password"
            })
        }
        const payload={data:doctor}
        const options={
            subject:doctor.email,
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
module.exports=router
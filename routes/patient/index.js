const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const Patient=require('../../model/patient')
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
module.exports=router
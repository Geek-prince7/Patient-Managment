const express=require('express')
const router=express.Router()
const Speciality=require('../../model/specilization')
router.post('/add',async(req,resp)=>{
    try {
        let speciality=await Speciality.create(req.body)
        return resp.status(200).json({
            code:1000,
            message:'success',
            data:speciality
        })

        
    } catch (error) {
        return resp.status(500).json({
            code:1001,
            message:'internal server error'
        })
        
    }
})

module.exports=router
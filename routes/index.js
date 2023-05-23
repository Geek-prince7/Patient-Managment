const express=require('express')
const router=express.Router()
router.use('/doctor',require('./doctor/index'))
router.use('/patient',require('./patient/index'))
router.use('/appointment',require('./appointment/index'))
router.use('/slot',require('./slot/index'))
router.use('/speciality',require('./speciality/index'))
router.get('/',(req,resp)=>{
    resp.status(200).json({
        code:1000,
        message:'ping from server'
    })
})


module.exports=router
const express=require('express')
const router=express.Router()
router.get('/',(req,resp)=>{
    resp.status(200).json({
        code:1000,
        message:'ping from server'
    })
})


module.exports=router
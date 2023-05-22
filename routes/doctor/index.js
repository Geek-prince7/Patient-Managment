const express=require('express')
const router=express.Router()
router.get('/',(req,resp)=>{
    resp.status(200).json({
        code:1000,
        message:'hello doctor from server'
    })
})
module.exports=router
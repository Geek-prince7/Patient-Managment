const express=require('express')
const router=express.Router()
const Slot=require('../../model/slot')

router.post('/add',async(req,resp)=>{
    try {
        let slot=await Slot.create(req.body)
        return resp.status(200).json({
            code:1000,
            message:'success',
            data:slot
        })

        
    } catch (error) {
        return resp.status(500).json({
            code:1001,
            message:'internal server error'
        })
        
    }
})

module.exports=router
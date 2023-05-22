const mongoose=require('mongoose')


const specializationSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true,
    },
})

const specialization=mongoose.model('specialization',specializationSchema)
module.exports=specialization
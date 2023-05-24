const mongoose=require('mongoose')


const specializationSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true,
    },
})

const specialization=mongoose.model('specializations',specializationSchema)
module.exports=specialization
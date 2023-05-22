const mongoose=require('mongoose')


const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    specilization:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'specialization'
    }
},{
    timestamps:true
})


const Doctors=mongoose.model('doctors',doctorSchema)
module.exports=Doctors
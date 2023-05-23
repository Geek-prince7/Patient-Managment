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
    speciality:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'specialization'
    },
    experience:{
        type:String,
        require:true
    },
    slot:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'slots',
        required:true
    }
},{
    timestamps:true
})


const Doctors=mongoose.model('doctors',doctorSchema)
module.exports=Doctors
const mongoose=require('mongoose')


const patientSchema=new mongoose.Schema({
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
    age:{
        type:Number,
        require:true
    },
    phone_no:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


const patient=mongoose.model('patients',patientSchema)
module.exports=patient
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/pms')
.then(()=>console.log('connected to db'))
.catch((error)=>console.log('error in connecting to db',error))
module.exports=mongoose

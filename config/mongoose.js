const mongoose=require('mongoose')
// const autoIncrement = require('mongoose-auto-increment');
mongoose.connect('mongodb://localhost:27017/pms')
.then(()=>console.log('connected to db'))
.catch((error)=>console.log('error in connecting to db',error))
// autoIncrement.initialize(mongoose.connection);
module.exports=mongoose

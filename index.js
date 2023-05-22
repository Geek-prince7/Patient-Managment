const express=require('express')
const PORT=5000
const mongoose=require('./config/mongoose')
const session=require('express-session')
const passport=require('passport')
const app=express()
app.use(express.urlencoded())
app.use('/',require('./routes/index'))



app.listen(PORT,(error)=>{
    if(error){
        console.log(`error in firing server ${error}`)
        return
    }
    console.log(`server is up on port ${PORT}`)
})
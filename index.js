const express=require('express')
const PORT=5000
const mongoose=require('./config/mongoose')
const session=require('express-session')
const passport=require('passport')
const passportJwt=require('./config/passport_jwt')
const cors=require('cors')
const app=express()
app.use(cors({
    origin:'*'
}))
app.use(express.urlencoded())
app.use(session({
    name:'pms',//key of cookie
    secret:'pmskey', // secret key
    saveUninitialized:false,
    resave:false,
    
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/',express.static('uploads'))
app.use('/',require('./routes/index'))



app.listen(PORT,(error)=>{
    if(error){
        console.log(`error in firing server ${error}`)
        return
    }
    console.log(`server is up on port ${PORT}`)
})
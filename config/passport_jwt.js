const passport=require('passport')
const Extractjwt=require('passport-jwt').ExtractJwt
const jwtStrategy=require('passport-jwt').Strategy
const Doctor=require('../model/doctors')

const options={
    jwtFromRequest:Extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'pms11'
}

const Strategy=new jwtStrategy(jwtOption,async(payload,done)=>{

})


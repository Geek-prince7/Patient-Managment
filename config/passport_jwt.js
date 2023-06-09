const passport=require('passport')
const Extractjwt=require('passport-jwt').ExtractJwt
const jwtStrategy=require('passport-jwt').Strategy
const Doctor=require('../model/doctors')
const Patient=require('../model/patient')
const options={
    jwtFromRequest:Extractjwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'pms11'
}
passport.use('doctor-jwt',new jwtStrategy(options,async(payload,done)=>{
    try {
        let doctor=await Doctor.findOne({email:payload.sub})
        if(doctor){
            console.log('i am here')
            return done(null,doctor)
        }
        return done(null,false)
        
    } catch (error) {
        console.log('error in finding doctor',error)
        return done(error,false)
        
    }

}))

passport.use('patient-jwt',new jwtStrategy(options,async(payload,done)=>{
    try {
        let patient=await Patient.findOne({email:payload.sub})
        if(patient){
            return done(null,patient)
        }
        return done(null,false)
        
    } catch (error) {
        console.log('error in finding patient',error)
        return done(error,false)
        
    }

}))

module.exports=passport


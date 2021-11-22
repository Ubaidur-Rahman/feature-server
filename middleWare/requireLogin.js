const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const User = mongoose.model("User")


const requireLogin = (req,res,next)=>{

    // const { authorization } = req.headers;
    // console.log(req.headers)
    // try {
    //     const token = authorization.split(' ')[1];
    //     console.log(token)
    //     jwt.verify(token, process.env.PRIVATE_KEY, (err,payload)=>{
    //             if(err){
    //              return   res.status(401).json({error:"you must be logged in"})
    //             }
        
    //             const {name} = payload
    //             console.log(payload)
    //             User.findById({name}).then(userdata=>{
    //                 req.email = userdata
    //                 next()
    //             })})
    //     console.log(decoded)
    //     const { email, userId } = decoded;
    //     req.email = email;
    //     req.userId = userId;
    //     next();
    // } catch(err) {
    //     next("Authorization failure!");
    // }





    const {authorization} = req.headers
    console.log(req)
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,process.env.PRIVATE_KEY,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
        
        
    })
}
    
module.exports = requireLogin;
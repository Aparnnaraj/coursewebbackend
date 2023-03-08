const express = require('express'); 
const signuprouter=express.Router();
const signupdata=require('../models/signup.js')
const bcrypt=require('bcrypt');//to encrypt password
const jwt=require('jsonwebtoken')
ademail='admin@gmail.com'
adpassword='admin123'
user="admin"
 function verifyToken(req,res,next){

if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request');
}
let token=req.headers.authorization.split('')[1]
if(token==='null'){
    return res.status(401).send('Unauthorized request');
}
    let payload=jwt.verify(token,'secretkey')
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }
    req.userId=payload.subject
    next();

 }




signuprouter.post('/signup',async (req,res)=>{

    try{
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
   // let uID = uniqueID();

      //encryption password using bcrypt
       bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.json({success:false,message:'Give password'})
        }

        else
        {
            var user={

           // id: uID,
            name: req.body.name,
            email: req.body.email,
            password:hash,
            number: req.body.number,
            qualification: req.body.qualification,
            specialisation: req.body.specialisation,
            isEnrolled: req.body.isEnrolled,
            gender:req.body.gender,
            users:req.body.users
           }
           
          
        
           
            const usersign = new signupdata(user);
            usersign.save((err,d)=>{
                if(err){
                    res.status(401).json({
                        message: 'Failed to create new user'
                    })
                } else{
                    res.status(200).json({
                        message: 'User created'
                    })
                }
            })
          
 
 
        } })

    }
    catch(err){
        console.log("error", err)
        res.status(500)
        res.json(err);
    }




})


signuprouter.post('/login',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')

    if(req.body.email==="admin@gmail.com"&&req.body.password==="admin123")
    {   
        let payload={subject:"req.body.email"+"req.body.password"}
        let token=jwt.sign(payload,'secretkey')
        console.log(token);
        return res.status(200).json({success:true,message:"Sucessful login",useradmin:"admin",token})

    }

    else
    {
        console.log(req.body.email)
    
    signupdata.find({email:req.body.email})
    .exec()
    .then((result)=>{
           if(result.length<1){
          return  res.status(404).res.json({success:false,message:'user not found'})
           }
           const user1=result[0];

           //checking approval of admin
            if(user1.isEnrolled===false){

                return res.status(404).json({success:false,message:"Not approved by the Admin"})
              

            }
            

           //comparing pasword
           

           bcrypt.compare(req.body.password,user1.password,(err,ret)=>{
            if(ret){

             let payload={subject:user1+user1.password}
             let token=jwt.sign(payload,'secretkey')
              return res.status(200).json({success:true,message:"Sucessful login",users:user1.users,token})

            }
            else{

                return res.status(404).json({success:false,message:"Password is not matching"})

            }


           })


    }).
    catch((err)=>{
        res.json({success:false,message:'err'})
    })

}



})






        
            
           
    module.exports=signuprouter;
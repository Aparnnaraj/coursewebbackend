const express = require('express'); 
const adminrouter=express.Router();
const signupdata=require('../models/signup.js');
const admincoursectegorydata=require('../models/admincoursecategory')
const admincoursedata=require('../models/adminnewcourse')


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
    




adminrouter.get('/addusers',function(req,res){
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    signupdata.find({"isEnrolled":false})
    .then(function(books){
        res.send(books);
        //console.log(books)
    });
})

     adminrouter.put('/approvestudent',(req,res)=>{
   // console.log("data",req.body.isEnrolled);  
    id=req.body._id 
   // console.log("id="+req.body._id)

   // isEnrolled=true  
 
    signupdata.findByIdAndUpdate({   "_id":id},
    {$set:{"isEnrolled":true
        }})
    .then(function(){
        res.send();
    })
})



  adminrouter.delete('/userremove/:id',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
   id = req.params.id;
   signupdata.findByIdAndDelete({"_id":id})
   .then(()=>{
       console.log('success')
       res.send();
   })
 })

//category of course

    adminrouter.post('/addcoursecategory',function(req,res){
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    var book={ 
    category:req.body.category,
    description:req.body.description,
    remark:req.body.remark
}

 var addbook = new admincoursectegorydata(book);
 addbook.save();

})


adminrouter.get('/selectcategory:id',function(req,res){
    res.header("Access-Control-Allow-Orgin","*");
   res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
  console.log("category"+req.params.id)
   const category = req.params.id;
   
    admincoursedata.find({"category":category})
   .then(function(books){
     
       res.send(books);

       
   });
})


    adminrouter.get('/coursecategorys',function(req,res){
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    admincoursectegorydata.find()
    .then(function(books){
        res.send(books);
        console.log(books)
    });
})

adminrouter.get('/user:id',(req, res) => {
   res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    const id = req.params.id;
      signupdata.findOne({"_id":id})
      .then((book)=>{
          res.send(book);
      });
  })


  adminrouter.get('/coursecategory:id',(req, res) => {
    res.header("Access-Control-Allow-Orgin","*");
     res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
     const id = req.params.id;
     admincoursectegorydata.findOne({"_id":id})
       .then((book)=>{
           res.send(book);
       });
   })


   adminrouter.delete('/categoryremove/:id',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
   id = req.params.id;
   admincoursectegorydata.findByIdAndDelete({"_id":id})
   .then(()=>{
       console.log('success')
       res.send();
   })
 })


 adminrouter.put('/categoryupdate',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    console.log(req.body)
    id=req.body._id,
    category= req.body.category,
    description = req.body.description,
    remark = req.body.remark
   
   admincoursectegorydata.findByIdAndUpdate({"_id":id},
                                {$set:{"category":category,
                                "description":description,
                                "remark":remark,
                                }})
   .then(function(){
       res.send();
   })
 })


 //admin added new course

 
    adminrouter.post('/addcourse',function(req,res){
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    var book={ 
        category:req.body.category,
    description:req.body.description,
    faculty:req.body.rate,
    course:req.body.course,
    rating:req.body.rating,
   // imageurl:req.body.imageurl
}

 var addbook = new admincoursedata(book);
 addbook.save();

})

adminrouter.get('/admincourses',function(req,res){
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    admincoursedata.find()
    .then(function(books){
        res.send(books);
        //console.log(books)
    });
})

adminrouter.put('/admincourseupdate',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
    console.log(req.body)
    id=req.body._id,
    category=req.body.category,
    description=req.body.description,
    faculty=req.body.faculty,
    course=req.body.course,
    rating=req.body.rating,
    //imageurl=req.body.imageurl
   admincoursedata.findByIdAndUpdate({"_id":id},
                                {$set:{"category":category,
                                "description":description,
                                "faculty":faculty,
                                "course":course,
                                "rating":rating,
                               // "imageurl":imageurl
                                }})
   .then(function(){
       res.send();
   })
 })


 adminrouter.delete('/admincourseremove/:id',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
   id = req.params.id;
   admincoursedata.findByIdAndDelete({"_id":id})
   .then(()=>{
       console.log('success')
       res.send();
   })
 })


 adminrouter.get('/admincourse:id',(req, res) => {
    res.header("Access-Control-Allow-Orgin","*");
     res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
     const id = req.params.id;
     admincoursedata.findOne({"_id":id})
       .then((book)=>{
           res.send(book);
       });
   })


//    adminrouter.get('/selectcategory:id',function(req,res){
//      res.header("Access-Control-Allow-Orgin","*");
//     res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE')
//     const id = req.params.id;
//     console.log("id"+id)
//     // admincoursectegorydata.find({category:req.body.c})
//     // .then(function(books){
//     //     res.send(books);
        
//     // });
// })



   




module.exports=adminrouter;
const express = require('express'); 
const adminrouter=express.Router();
const signupdata=require('../models/signup.js');
const admincoursectegorydata=require('../models/usercoursecategory')
const admincoursedata=require('../models/usernewcourse')


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
    faculty:req.body.faculty,
    course:req.body.course,
    rating:req.body.rating,
    //imageurl:req.body.imageurl
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
        console.log(books)
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
                                //"imageurl":imageurl
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


   




module.exports=adminrouter;
const express=require('express');
const app=express();
const jwt=require('jsonwebtoken')
const bodyParser=require('body-parser');//added bodyparser 
const cors = require('cors');
const bcrypt=require('bcrypt');
var path = require("path");
app.use(cors());


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

const signuprouter=require('./src/routes/signuproute')
 const adminrouter=require('./src/routes/adminrouter')
 const userrouter=require('./src/routes/userrouter')

app.use('/user',signuprouter);
app.use('/admin',adminrouter);
app.use('/userad',userrouter);



 app.listen(process.env.PORT || 3000
 ,() => {
   console.log("Server Ready on 3000"); 
  });

// app.listen(3000, ()=> console.log('server started at port 3000'));
  
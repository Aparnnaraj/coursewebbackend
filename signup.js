const mongoose=require('mongoose');
//const url = "mongodb+srv://aparna:B7oTV0GJi8wHh5HE@cluster0.pvrs8gr.mongodb.net/CourseWebApp";
//mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }); 

mongoose.connect('mongodb://localhost:27017/courseweb_app')

const Schema=mongoose.Schema;
const userSchema=new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    number: {
        type: Number,
    },
/*    username: {
        type: String,
    },*/
    password: {
        type: String,
    },
/*    dob: {
        type: String,
    },*/
/*    subject: {
        type: String,
    },*/
    qualification: {
        type: String,
    },
    specialisation: {
        type: String,
    },
    isEnrolled: {
        type: Boolean,
    },
    batch:{
        type:String,
    },
    gender: {
        type: String,
    },
    users: {
        type: String,
    },
    file:{
        type:String
    }

})

//email validation
// userSchema.path('email').validate(async(email)=>{
//     const emailcount=await mongoose.models.signupdata.countDocuments({email})
//     return !emailcount
// },'Email already exists')

const signupdata = mongoose.model('signupdata',userSchema);
//db.signupdata.createIndex( { "email": 1 }, { unique: true } )


module.exports=signupdata;
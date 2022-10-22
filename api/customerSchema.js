// login page (register schema)
const mongoose= require("mongoose");
mongoose.connect("mongodb+srv://yousfa:Amazon123@cluster0.nfqggsr.mongodb.net/storeDB?retryWrites=true&w=majority",{
 
})
const registerSchema=new mongoose.Schema({
      fname:{
        type:String,
        required:[true,"why no name ?"]  // can not be left blank
      },
      lname:{
        type:String,
        required:[true,"why no name ?"]  // can not be left blank
      },
      email:String,
      password:String
      
    });

    module.exports = mongoose.model('Register', registerSchema);          


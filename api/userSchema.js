const mongoose= require("mongoose");
const passportLocalMongoose=require('passport-local-mongoose')

mongoose.connect(process.env.MONGO_URI);
mongoose.set('strictQuery', true);

const UserSchema=new mongoose.Schema({
      fname:String,
      lname:String,
      username:String,
      password:String,
      question:String,
      answer:String,
      img:
      {
        type: Buffer,
        required:true   
      }
            
});
UserSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model('user', UserSchema);          


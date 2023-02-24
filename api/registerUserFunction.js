var Register = require('./userSchema');

function registerUser(props){
      Register.findOne({email:props.email},function(err,result){
      if(err)
      console.log("error");
      else if(result)
      console.log(result +"already exists");
      else{
        const newUser= new Register({
          username:props.username,
          fname:props.fname,
          lname:props.lname,
          password:props.password,
          email:props.email,

        });
      
        newUser.save();
        console.log("saved");
      }
  });

}
module.exports={registerUser}
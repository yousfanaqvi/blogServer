const express = require("express");
const passport=require('passport');
const router = express.Router();
var Register = require('./userSchema');
var Post = require('./postSchema');

const multer  = require('multer')
var fs = require('fs');
var path = require('path');
const console = require("console");
const LocalStrategy = require('passport-local').Strategy; 

passport.use(new LocalStrategy(Register.authenticate()));
var upload = multer({ dest: 'uploads' });
passport.serializeUser(Register.serializeUser());
passport.deserializeUser(Register.deserializeUser());

router.post("/login", passport.authenticate("local",{
    failureRedirect: "/loginerror"}), 
    function(req, res){
    if(req.isAuthenticated()){
        res.send({user:req.user,sessionId:req.sessionID});
        
    }
   
});

router.get('/loginerror',(req,res) => {
    console.log("er")
    res.status(401)
    throw new Error('Invalid user data')
});

router.post("/registerUser",upload.single('image'),(req,res) => {
  
    Register.register(new Register(
        {
            fname:req.body.fname,
            lname:req.body.lname,
            username:req.body.username,
            question:req.body.Question,
            answer:req.body.answer,
            img:fs.readFileSync(path.join(__dirname, "../uploads/" + req.file.filename))
        })
            ,req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/loginerror");

        }
        else{
            passport.authenticate('local')(req, res, function () {
                res.send("user registered");

            });
    }
});

});
router.get("/getUserData", (req, res) => {
   
        res.send(req.user)
  
});

router.post("/forgotpassword", (req,res) => {
    Register.findOne({username:req.body.username},function(err,result){
        if(err)
        {
            res.send({ code: 500, message: 'user not found' })
            console.log(err);

        }
        else if(result){
            res.send(result)
        }
        else if(!result)
        {
            res.send({code:500})
        }
        
    });
});

router.post("/setpassword",upload.none(), (req,res) => {
    Register.findOne({username:req.body.username},function(err,result){
        result.setPassword(req.body.password, function (err) {
        result.save()
        if (err) {
          console.log(err);
        } else {
          console.log("no")
        }
      })
    })
});

router.post('/changePassword', function (req, res) {

    Register.findOne({"_id":req.user.id}, function (err, user) {
            if (!err) {
                user.changePassword(req.body.oldPassword, req.body.newPassword, function (err) {
                    if (!err) {
                        res.send({code:200})
                    } else {
                        console.log(err);
                        res.send({code:500});
                    }
                })
            } else {
                console.log(err);
            }
    })
})


router.post('/editProfile',  function(req, res){
if(req.isAuthenticated()){
    Register.findOneAndUpdate({"_id":req.user.id},
    {$set:{
        "fname":req.body.fname,
        "lname":req.body.lname,
    }},{new: true }, function (err, user) {

        if (err) {
            console.log(err)
        }
        else if(!user){
            console.log("user not found")
        }
        else if(user){
            res.send(user);
            
        }
    
    });      
    }
});

router.post('/editPicture', upload.single('image'),function(req, res)
{
    if(req.isAuthenticated())
    {
        Register.findOneAndUpdate({"_id":req.user.id},
        {$set:{
           "img":fs.readFileSync(path.join(__dirname, "../uploads/" + req.file.filename))
        }}, function (err, user) {
    
        if (err) {
        console.log(err)
        }
        else if(!user){
            res.redirect("/loginerror");
        }
        else if(user){
            res.send(user)
        }
        });
    }
    else{
        console.log(req.isAuthenticated)
    }
 });

router.delete("/deleteAccount",function(req,res){
    Register.deleteOne( { "_id" : req.user.id },function(err,result){
        if(err)
            console.log(err)
        else if (!result)
            res.send("user not found")
        else
            res.send({code:200});
        
        })
});

router.get("/logout", function(req, res){
    req.logout(function(err){
        if(err)
        console.log(err)
        else
        res.send("success");

        });
        console.log("logout"+ req.isAuthenticated)
  
  });

  //////////////////////////////////////////////////////////////////////////////////

router.post("/createPost",upload.single('image'),function(req,res){
  
    const newpost= new Post({ 
        title:req.body.title,
        img:fs.readFileSync(path.join(__dirname, "../uploads/" + req.file.filename)),
        postBody:req.body.post,
        author:req.body.authorName,
        postDate:new Date(),
        category:req.body.category,
    });
    newpost.save();
    res.send("post successful");

    
});

router.post("/updatePostPicture", upload.single("image"), function(req,res){
    Post.findOneAndUpdate({"_id":req.body.id},
        {$set:{
            "img":fs.readFileSync(path.join(__dirname, "../uploads/" + req.file.filename))
        }}
        ,{new: true }, function (err, post) {
    
            if (err) {
                console.log(err)
            }
            else if(!post){
                res.send("post not found")
            }
            else if(post){
                res.send("upload successful");
                
            }
        
        }); 

});

router.post("/updatePost",function(req,res){
    Post.findOneAndUpdate({"_id":req.body.id},
        {$set:{
            "title":req.body.title,
            "postBody":req.body.post,
            "author":req.body.authorName,
            "postDate":new Date(),
            "category":req.body.category,
        }},{new: true }, function (err, post) {
    
            if (err) {
                console.log(err)
            }
            else if(!post){
                res.send("post not found")
            }
            else if(post){
                res.send("edit successful");
                
            }
        
        }); 
 });
router.get("/readPost",function(req,res){
    Post.find({author:req.query.id},function(err,post){
        if(err){
        console.log(err)
        }
        else if(post){
            res.send(post)
        }
    })   
    
});
router.get("/readAllPost",function(req,res){
    Post.find({},function(err,post){
        if(err){
        res.send(err)
        console.log(err)
        }
        else if(post){
            res.send(post)
        }
    })   
    
});
router.delete("/deletePost",function(req,res){
    Post.deleteOne( { "_id" : req.query.postID },function(err,result){
        if(err)
            console.log(err)
        else if (!result)
            res.send("post not found")
        else
            res.send({code:200});
        
        })
 
});

module.exports = router;
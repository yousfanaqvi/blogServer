const express = require("express");
const router = express.Router();
var regFn = require("./registerCustomer")
var Register = require('./customerSchema');
const stripe= require("stripe")(process.env.stripkey);

/**
 * GET product list.
 *
 * @return product list | empty.
 */
 router.get("/", async (req, res) => {
    res.send("home");
  });
  
router.get("/product", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "product",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

router.get("/customer", async (req, res) => {
    try {
      res.json({
        status: 200,
        message: "customer",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  });

  router.get("/getdata", (req, res) => {
     console.log(req.query.email);
    Register.findOne({email:req.query.email},function(err,result){
          if(err)
        console.log("error");
        else if(result)
         res.json(result);
         else{
          res.send("not found");
         }
      });
    });

    router.post("/loginUser", (req,res) => {
        Register.findOne({email:req.body.email,password:req.body.password},function(err,result){
        if(err)
        console.log("error");
        else if(result)
        {
            res.statusMessage = "found";
            res.status(200).end();
        }
        else{
            res.statusMessage = "Not found";
            res.status(400).end();
        }   
    });
          
    });
        
    router.post("/payment" ,  (req,res) => {
            const {product,token}=req.body;
            console.log("product", product);
            console.log("price", product.price);
                
            return stripe.customers
            .create({
                email:token.email,
                source:token.id
                })
            .then(customer =>{
                stripe.charges.create({
                amount:product.price,
                currency:"usd",
                customer:customer.id,
                receipt_email:token.email,
                description:`purchase of ${product.name}`,
                    
                shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }}
            })
            })
            .then(result => {
                res.status(200).json(result);        
              })
            .catch(err => console.log(err))
    })
            
router.post("/registerUser",(req,res) => {
    const reg=regFn.registerCustomer(req.body);
    Register.find({email:req.body.email},function(err,result){
    if(err)
        console.log("error");
    else if(result.length!==0)
    {
        res.statusMessage = "found";
        res.status(200).end();
        console.log(result);
    }
    else{
        res.statusMessage = "Not found";
        res.status(400).end(); 
    } 
  });
});
  
module.exports = router;

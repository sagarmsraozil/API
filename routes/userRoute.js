const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const {check,validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {dataValidation} = require('../utils/utils');


router.post('/insert/user',
[
    check('first_name',"Insert firstname").not().isEmpty(),
    check('last_name',"Insert lastname").not().isEmpty(),
    check('username',"Insert usertname").not().isEmpty(),
    check('email',"Insert email").not().isEmpty(),
    check('password',"Insert password").not().isEmpty(),
    check('email','Inappropriate email').isEmail(),
    check('password',"Password need to contain atleast 6 characters").isLength({"min":6})
],
(req,res)=>{
    var {first_name,last_name,username,email,password} = req.body;
    // var fn = req.body['fn'];
    // var ln = req.body['ln'];
    // var un = req.body['un'];
    // var em = req.body['em'];
    // var pw = req.body['pw'];

    var errors = validationResult(req);

    if(errors.isEmpty())
    {
        User.find({}).then((data)=>{
           let userData = {"email":email,"username":username}; 
           let validationResult = dataValidation(data,userData);
           if(validationResult == true)
            {
                bcryptjs.hash(password,10,(err,hash)=>{
                    const user = new User({"first_name":first_name,"last_name":last_name,"username":username,"email":email,"password":hash});
                    user.save().then((result)=>{
                       return res.status(200).json({"success":true,"message":"User registered successfully!!"})
                    });
                })
            }
            else
            {
                return res.status(202).json({"success":false,"message":`${validationResult}`});
            }
           
        })
      
    }
    else
    {
       return res.status(401).json({"success":false,"message":errors.array()});
    }
})


router.post('/login/user',(req,res)=>{
    const un = req.body['un'];
    const pw = req.body['pw'];

    User.findOne({"username":un}).then((data)=>{
        if(data == null)
        {
           return res.status(202).json({"success":false,"message":"Invalid credentials"});
        }
        else
        {
            bcryptjs.compare(pw,data.password,(err,result)=>{
                if(result == false)
                {
                    return res.status(202).json({"success":false,"message":"Invalid credentials"});    
                }
                else
                {
                    const token = jwt.sign({"userId":data._id},"secretkey");
                    return res.status(200).json({"success":true,"token":token,"message":""});    
                }
            })
        }
    })
})



router.get('/retrieveUsers',(req,res)=>{
    var query = User.find({});
    query.then((data)=>{
        if(data!=null)
        {
            res.status(200).json({"success":true,"message":data,"count":data.length});
           
        }
    })
})

module.exports = router;


const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');
const {check,validationResult} = require('express-validator');
const upload = require('../middleware/upload');

router.post('/insert/student',
[
    check('fullName',"Enter student name").not().isEmpty(),
    check('address',"Enter address").not().isEmpty(),
    check('gender',"Enter gender").not().isEmpty(),
 
    check('age',"Enter age").not().isEmpty()
]
,(req,res)=>{
    var fn = req.body['fullName'];
    var ad = req.body['address'];
    var gender = req.body['gender'];
   
    var age = req.body['age'];

    var errors = validationResult(req);

    if(errors.isEmpty())
    {
        const student = new Student({"fullName":fn,"address":ad,"gender":gender,"age":age});
        student.save().then((result)=>{
            
            res.status(200).json({"success":true,"message":"Student Added!!","userId":result._id});
        })
    }
    else
    {
        res.status(202).json({"success":true,"message":errors.array()});
    }
});

router.get('/get/student',(req,res)=>{
    Student.find({}).then((data)=>{
        res.status(200).json({"success":true,"data":data});
    }).catch((err)=>{
        res.status(406).json({"message":"Something went wrong"});
    })
})


router.delete('/delete/:pid',(req,res)=>{
    let pid = req.params['pid'];
    Student.findOne({"_id":pid}).then((data)=>{
        if(data!=null)
        {
            Student.deleteOne({"_id":pid}).then((result)=>{
                return res.status(200).json({"success":true,"message":"Deleted"});
            }).catch((err)=>{
                return res.status(401).json({"success":false,"message":err});
            })
        }
        else
        {
            return res.status(202).json({"success":false,"message":"Cannot find the given instance"});
        }
    })
})


router.put('/insertPicture/:id',upload.single('file'),(req,res)=>{
    let id = req.params.id;
    console.log(id);
    console.log(req.file);
    if(req.file == undefined)
    {
        return res.status(202).json({"success":false,"message":"Inappropriate file format!!"});
    }
    else
    {
        let picture = req.file['path'];
        let query = Student.findOne({"_id":id});
        query.then((data)=>{
            if(data!=null)
            {
               Student.updateOne({"_id":id},{$set:{"dp":picture}}).then((result)=>{
                return res.status(200).json({"success":true,"message":"Uploaded"})
               }).catch((err)=>{return res.status(404).json({"success":false,"message":"Error"})});
            }
            else
            {
                return res.status(202).json({"success":false,"message":"No instance found!!"});
            }
        })
    }
    
})

module.exports = router;
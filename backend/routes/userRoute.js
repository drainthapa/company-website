const express = require("express");
const User = require('../models/userModel');

const router = express.Router();
//create

router.post("/",async (req,res)=>{

    const {name,email,age} = req.body;
    try {
        const userAdded= await User.create({
            name:name,
            email:email,
            age:age,
        });
    
        res.status(201).json(userAdded)
    } catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
});


//GET
router.get("/",async (req,res)=> {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll)
    } catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
});


//get Single User
router.get("/:id",async (req,res)=> {
    const {id} = req.params;
    try {
        const singleUser = await User.findById({_id : id});
        res.status(200).json(singleUser)
    } catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
});

//delete
router.delete("/:id",async (req,res)=> {
    const {id} = req.params;
    try {
        const singleUser = await User.findByIdAndDelete({_id : id});
        res.status(200).json(singleUser)
    } catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
});

//put/patch/update
router.patch("/:id",async (req,res)=> {
    const {id} = req.params;
    const {name,email,age} = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id, req.body,{
            new:true,
        });
        res.status(200).json(updateUser)
    } catch(error){
        console.log(error);
        res.status(500).json({error:error.message});
    }
});

module.exports = router;


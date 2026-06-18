const express = require("express");
const router = express.Router();

const Chat = require("../models/Chat");

const auth = require("../middleware/authMiddleware");


// Get chat history
router.get("/", auth, async(req,res)=>{

    try{

        const chats =
        await Chat.find({
            user:req.user
        });

        res.json(chats);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});



// Save chat
router.post("/", auth, async(req,res)=>{

    try{

        const chat =
        await Chat.findOne({
            user:req.user
        });


        if(chat){

            chat.messages.push(
                req.body.message
            );

            await chat.save();

            return res.json(chat);

        }


        const newChat =
        await Chat.create({

            user:req.user,

            messages:[
                req.body.message
            ]

        });


        res.json(newChat);



    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});



// Delete chat
router.delete("/", auth, async(req,res)=>{

    try{

        await Chat.findOneAndDelete({
            user:req.user
        });


        res.json({
            message:"Chat deleted"
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


module.exports = router;
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    messages:[
        {
            type:{
                type:String,
                enum:["user","bot"]
            },

            text:String,

            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]

},{
    timestamps:true
});


module.exports = mongoose.model(
    "Chat",
    chatSchema
);
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const featureSchema = mongoose.Schema({

    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },

    logo: {
        type: String,
    },

    votes: [{ type: ObjectId ,ref:"User" }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "User" }
    }],
    postedBy:{
       type:ObjectId,
       ref:"User"
    }},
    {
        timestamps: true,
    }
);

module.exports = featureSchema;
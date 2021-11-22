const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../middleWare/requireLogin");
const router = express.Router();
const featureSchema = require("../schemas/featureSchema");

const Feature = new mongoose.model("Feature", featureSchema);



router.get("/allFeature", async (req, res) => {
  await Feature.find({}, (err, data) => {
    if (err) {
      res.status(500).json({
        error: err,
        status: false,
      });
    } else {
      res.status(200).json({
        result: data,
        message: "Feature get successfully",
      });
    }
  });
});

router.get("/allFeatureByNew", (req, res) => {
    Feature.find({})
    .sort('-createdAt')
    .then((result)=>{
        res.json({result})
    }).catch(err=>{
        console.log(err)
    })
  });
  
  router.get("/allFeatureByStatus", (req, res) => {
    Feature.find({})
    .sort('-status')
    .then((result)=>{
        res.json({result})
    }).catch(err=>{
        console.log(err)
    })
  });
  

// post a Feature

router.post("/addFeature", (req, res) => {
    const newFeature = new Feature(req.body);
    newFeature.save((err) => {
      if (err) {
        res.status(500).json({
          error: err,
          status: false,
        });
      } else {
        res.status(200).json({
          message: "Feature was inserted successfully",
        });
      }
    });
  });


  router.put('/vote', requireLogin,(req,res)=>{
      console.log(req)
      Feature.findByIdAndUpdate(req.body.id,{
        $push:{votes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.put('/unVote',(req,res)=>{
    Feature.findByIdAndUpdate(req.body.postId,{
        $pull:{votes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.put('/comment',(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Feature.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


  module.exports = router;
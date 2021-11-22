const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../schemas/userSchema");

const User = new mongoose.model("User", userSchema);


//get allUser

router.get("/allUser", async (req, res) => {
    await User.find({}, (err, data) => {
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

// signup

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    console.log(req.body)
    await newUser.save();
    res.status(200).json({
      message: "signup success",
    });
  } catch {
    res.status(500).json({
      message: "Signup failed",
    });
  }
});

//login

router.post("/login", async (req, res) => {


  try {
    const user = await User.find({ email: req.body.email });
    if (user && user.length > 0) {
      const isPassValid = await bcrypt.compare(req.body.password, user[0].password);

      if (isPassValid) {
        //token generate
        const token = jwt.sign({
          name: user[0].name,
          email: user[0].email,
        }, process.env.PRIVATE_KEY, {
          expiresIn: '1h'
        });
        res.status(200).json({
          "email": user[0].email,
          "token": token,
          "message": "Login Successful"

        })

      } else {
        res.status(401).json({
          "error": "Authentication failed"
        });
      }

    } else {
      res.status(401).json({
        "error": "Authentication failed"
      });
    }
  } catch {
    res.status(401).json({
      "error": "Authentication failed"
    });
  }


})




module.exports = router;
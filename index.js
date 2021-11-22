const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userHandler = require("./routeHandler/userHandler");
const featureHandler = require("./routeHandler/featureHandler");


// dotenv config
require('dotenv').config()
const port = 5055;

// express app initialization
const app = express();
app.use(express.json());
app.use(cors());


console.log(process.env.DB_NAME);

// database connection with mongoose
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rqdtk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// const uri =
//   `mongodb+srv://DevZone:${process.env.DB_PASS}@cluster0.cbiot.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log(err));

// application routes

app.get("/", (req, res) => {
  res.send("Server Running Successfully in port 5055");
});

app.use("/users", userHandler)
app.use("/feature", featureHandler)







// error Handler
function errHandler(err, req, res, next) {
  if (res.headersSet) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.use(errHandler)





app.listen(process.env.PORT || port);

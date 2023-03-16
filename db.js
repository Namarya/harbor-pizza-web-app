const mongoose = require("mongoose");
require("dotenv").config();
var mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB connection succesfully");
});

db.on("error", () => {
  console.log("MongoDB connection failed");
});

module.exports = mongoose;

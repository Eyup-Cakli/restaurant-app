const mongoose = require("mongoose");

const dbURI = "mongodb+srv://eyupcakli98:atlas123@restaurant-app.m2hycjs.mongodb.net/";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };

  module.exports.connectMongoDB = () => {
    mongoose
      .connect(dbURI, options)
      .then(() => console.log("Database connected."))
      .catch((err) => console.error("Database connection error: ", err));
  };
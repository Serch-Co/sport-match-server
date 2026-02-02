const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const matchRoute = require("./routes/match");

app.use(express.json());
// CRUD Match
app.use("/api/matches", matchRoute);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.m9x5xch.mongodb.net/matches-API?retryWrites=true`
  )
  .then(() => {
    console.log("Database connection established ");
    app.listen(3000, () => {
      console.log("Listening at port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection Failed: ", err);
  });

app.get("/", (req, res) => {
  res.send("API listening for Matches");
});

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

//server

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.9clk0.mongodb.net/job-task-alzaf?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url).then(() => {
  console.log("Database Connection successful");
});

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running Node Server");
});

app.listen(port, () => {
  console.log("App is Running");
});

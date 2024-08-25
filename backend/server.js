const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const ejs = require("ejs");
const ProjectSubmission=require("./controller/project_submission");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/projects",ProjectSubmission)


mongoose.connect(`mongodb://127.0.0.1:27017/hackpro`, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database successfully");
});
app.listen(5000, () => { console.log("Server started on port 5000") });

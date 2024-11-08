const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.alzaf-frontend.vercel.app",
      "https://alzaf-frontend.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const usersRoute = require("./routes/v1/users.route");
const setupScheduler = require("./utils/scheduler");

app.use("/api/v1/users", usersRoute);

// remove unverified user form database
setupScheduler();

module.exports = app;

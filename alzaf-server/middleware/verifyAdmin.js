const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/User");
const { logutUser } = require("../controllers/users.controller");

module.exports = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: "fail",
        error: "You are not logged in",
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    const userResult = await User.findOne({
      email: decoded?.email,
      role: decoded?.role,
    });

    if (!userResult) {
      return res.status(401).json({
        status: "fail",
        error: "You are  unauthorized",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      status: "fail",
      error: "Invalid token",
    });
  }
};

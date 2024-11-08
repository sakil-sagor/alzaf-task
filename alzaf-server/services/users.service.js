const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// create user

const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.register = async (userData) => {
  // this condition for email verification
  const verificationToken = crypto.randomBytes(20).toString("hex");
  const verificationTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  const details = { ...userData, verificationToken, verificationTokenExpire };
  console.log(details);
  const newUser = new User(details);

  await newUser.save();
  // this condition for email verification
  const verificationUrl = `https://alzaf-frontend.vercel.app/verify/${verificationToken}`;

  const message = `
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px #16375e;
        }
        .header {
          text-align: center;

          display: flex;
          align-items: center;
          justify-content: center;
        }
        .title {
          font-size: 32px;
          font-weight: bold;
        }
        .logo-img {
          max-width: 80px;
          margin-right: 5px;
        }
        .content {
          padding: 20px;
        }
        .content h1 {
          font-size: 24px;
          color: #333333;
        }
        .content p {
          font-size: 16px;
          color: #666666;
        }
        .content a.button {
          display: inline-block;
          padding: 10px 20px;
          margin: 20px 0;
          color: #ffffff;
          background-color: #16375e;
          text-decoration: none;
          border-radius: 4px;
          text-align: center;
          font-size: 16px;
        }
        .content a.button:hover {
          background-color: #0056b3;
        }
        .footer {
          text-align: center;
          padding: 10px 0;
          font-size: 14px;
          color: #999999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
       
          <div>
            <p class="title">Alzaf It Solutions</p>
          </div>
        </div>
        <hr />
        <div class="content">
          <h1>Account Verification</h1>
          <p>Please verify your account by clicking the button below:</p>
          <a href="${verificationUrl}" class="button" clicktracking="off"
            >Verify Account</a
          >
          <p>If you did not create an account, no further action is required.</p>
        </div>
        <div class="footer">
          <p>&copy; 2019 Alzaf It Solutions All rights reserved.</p>
     
        </div>
      </div>
    </body>
  </html>

  `;

  await sendEmail({
    to: newUser.email,
    subject: "Account Verification",
    text: "Please verify your account",
    html: message,
  });
  return newUser;
};
// verify user
exports.verifyEmailLink = async (token) => {
  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpire: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired token");

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpire = undefined;
  await user.save();

  return {
    _id: user._id,
  };
};

// get single user for login
exports.getUserInDB = async (email, password) => {
  const result = await User.findOne({
    email: email,
    password: password,
    isVerified: true,
    isDeleted: false,
  });

  if (!result) {
    throw new Error("No user found, please create an account");
  }

  return result;
};

exports.getAllUserFromDb = async (page, limit, search) => {
  const searchTerm =
    typeof search === "undefined" || search === null ? "" : search;

  const regexSearch = new RegExp(searchTerm, "i");
  let query = {};
  if (searchTerm) {
    query.$or = [
      { role: { $regex: regexSearch } },
      { fullName: { $regex: regexSearch } },
      { email: { $regex: regexSearch } },
    ];
  }

  const result = await User.find(query)
    .sort({ fullName: "asc" })
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));
  const total = await User.countDocuments(query);
  return { result, total };
};
exports.updateUserfromDb = async (id, data) => {
  const result = await User.updateOne({ _id: id }, { $set: data });
  return result;
};
exports.deleteUserfromDb = async (id) => {
  const result = await User.deleteOne({ _id: id });
  return result;
};

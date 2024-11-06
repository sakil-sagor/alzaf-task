const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// create user

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

exports.register = async (userId, fullName, email, phone, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  // this condition for email verification
  // const verificationToken = crypto.randomBytes(20).toString("hex");
  // const verificationTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  const newUser = new User({
    userId,
    fullName,
    email,
    phone,
    password: hashedPassword,
    // this condition for email verification
    // verificationToken,
    // verificationTokenExpire,
  });

  await newUser.save();
  // this condition for email verification
  // const verificationUrl = `https://tendertradinginc.com/verify/${verificationToken}`;

  //   const message = `
  //   <!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <style>
  //       body {
  //         font-family: Arial, sans-serif;
  //         margin: 0;
  //         padding: 0;
  //         background-color: #f4f4f4;
  //       }
  //       .container {
  //         max-width: 600px;
  //         margin: 20px auto;
  //         background-color: #ffffff;
  //         padding: 20px;
  //         border-radius: 8px;
  //         box-shadow: 0 0 10px #16375e;
  //       }
  //       .header {
  //         text-align: center;

  //         display: flex;
  //         align-items: center;
  //         justify-content: center;
  //       }
  //       .title {
  //         font-size: 32px;
  //         font-weight: bold;
  //       }
  //       .logo-img {
  //         max-width: 80px;
  //         margin-right: 5px;
  //       }
  //       .content {
  //         padding: 20px;
  //       }
  //       .content h1 {
  //         font-size: 24px;
  //         color: #333333;
  //       }
  //       .content p {
  //         font-size: 16px;
  //         color: #666666;
  //       }
  //       .content a.button {
  //         display: inline-block;
  //         padding: 10px 20px;
  //         margin: 20px 0;
  //         color: #ffffff;
  //         background-color: #16375e;
  //         text-decoration: none;
  //         border-radius: 4px;
  //         text-align: center;
  //         font-size: 16px;
  //       }
  //       .content a.button:hover {
  //         background-color: #0056b3;
  //       }
  //       .footer {
  //         text-align: center;
  //         padding: 10px 0;
  //         font-size: 14px;
  //         color: #999999;
  //       }
  //     </style>
  //   </head>
  //   <body>
  //     <div class="container">
  //       <div class="header">
  //         <div>
  //           <img
  //             class="logo-img"
  //             src="https://i.ibb.co/4RfCKwF/tti-logov2.png"
  //             alt="Tender Trading Inc."
  //           />
  //         </div>
  //         <div>
  //           <p class="title">Tender Trading Inc.</p>
  //         </div>
  //       </div>
  //       <hr />
  //       <div class="content">
  //         <h1>Account Verification</h1>
  //         <p>Please verify your account by clicking the button below:</p>
  //         <a href="${verificationUrl}" class="button" clicktracking="off"
  //           >Verify Account</a
  //         >
  //         <p>If you did not create an account, no further action is required.</p>
  //       </div>
  //       <div class="footer">
  //         <p>&copy; 2019 Tender Trading Inc. All rights reserved.</p>
  //         <p>27 SHAPTAK SQUARE, Road No 16, Dhaka 1205</p>
  //       </div>
  //     </div>
  //   </body>
  // </html>

  // `;

  //   await sendEmail({
  //     to: newUser.email,
  //     subject: "Account Verification",
  //     text: "Please verify your account",
  //     html: message,
  //   });
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
    isVerified: true,
    isDeleted: false,
  });

  if (!result) {
    throw new Error("No user found, please create an account");
  }

  const isMatch = await bcrypt.compare(password, result.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return result;
};

// get single user
exports.findUserByPhone = async (email) => {
  const result = await User.findOne({
    email: email,
    isVerified: true,
    isDeleted: false,
  }).select("-password -_id -updatedAt -status -isVerified -isDeleted -__v");
  return result;
};

exports.fogetpassUpdateEmail = async (email) => {
  const findUser = await User.findOne({
    email: email,
    isVerified: true,
    isDeleted: false,
  });

  if (!findUser) {
    throw new Error("User not found or is deleted.");
  }

  const verificationToken = crypto.randomBytes(20).toString("hex");
  const verificationTokenExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  const verifyData = {
    verificationToken: verificationToken,
    verificationTokenExpire: verificationTokenExpire,
  };

  Object.assign(findUser, verifyData);
  const resetUser = await findUser.save();

  const verificationUrl = `https://tendertradinginc.com/reset-password/${verificationToken}`;

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
   
      </div>
      <div>
        <p class="title">Tender Trading Inc.</p>
      </div>
    </div>
    <hr />
    <div class="content">
      <h1>Reset Password</h1>
      <p>Please reset your account password by clicking the button below:</p>
      <a href="${verificationUrl}" class="button" clicktracking="off"
        >Reset Password</a
      >
      <p>Please Note : Once clicked, the link will no longer be active. </p>
    </div>
    <div class="footer">
      <p>&copy; 2019 Tender Trading Inc. All rights reserved.</p>
      <p>27 SHAPTAK SQUARE, Road No 16, Dhaka 1205</p>
    </div>
  </div>
</body>
</html>

`;
  await sendEmail({
    to: email,
    subject: "Froget Password Reset",
    text: "Please reset your password here...",
    html: message,
  });
  return resetUser;
};

// verify user
exports.resetPasswordDb = async (token, pass) => {
  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpire: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired token");

  const hashedPassword = await bcrypt.hash(pass, 10);
  user.password = hashedPassword;
  user.verificationToken = undefined;
  user.verificationTokenExpire = undefined;
  await user.save();

  return user;
};

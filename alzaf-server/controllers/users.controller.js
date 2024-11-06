const User = require("../models/User");

const {
  getUserInDB,
  findUserByPhone,
  register,
  verifyEmailLink,
  fogetpassUpdateEmail,
  resetPasswordDb,
} = require("../services/users.service");
const { generateToken } = require("../utils/token");

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (user) {
      if (user?.isDeleted === true) {
        throw new Error(
          "Your account has been banned. Please contact the administrator for any enquires."
        );
      }
      // this condition for email verification
      // if (user?.isVerified === false)
      //   throw new Error(
      //     "Your verification token has already been sent to your email. Please check your email or try again after 15 minutes."
      //   );
      // if (user.isVerified === true) throw new Error("User already exists");
      if (user.email === email) throw new Error("User already exists");
      if (user.phone === phone) throw new Error("Phone number already used");
    }

    // make unique user id
    const getLastUser = await User.find().sort({ _id: -1 }).limit(1);
    const id = getLastUser[0]?.userId;
    let userId;
    if (id) {
      userId = parseInt(id) + 1;
    } else {
      userId = 1001;
    }
    const newUser = await register(userId, fullName, email, phone, password);
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await verifyEmailLink(token);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        error: "please provide your credentials",
      });
    }
    const result = await getUserInDB(email, password);

    if (!result) {
      return res.status(401).json({
        status: "fail",
        error: "No user found, please create an account",
      });
    }
    const token = generateToken(result);
    const { password: pwd, ...findUser } = result.toObject();

    res
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ success: true, userData: findUser });
  } catch (error) {
    res.status(500).json({
      status: "fail",

      message: error.message,
    });
  }
};

// forget password
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req?.query;
    const userData = await findUserByPhone(email);

    res.status(200).json({
      status: "success",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't create User",
      error: error.message,
    });
  }
};
// forget password send email for verify
exports.sendEmailForgetPass = async (req, res) => {
  try {
    const { email } = req?.query;
    const userData = await fogetpassUpdateEmail(email);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};
// forget password after send email for verify and set pass
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { new_password } = req.body;
    const userData = await resetPasswordDb(token, new_password);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.message,
    });
  }
};

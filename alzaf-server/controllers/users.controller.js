const User = require("../models/User");

const {
  getUserInDB,
  findUserByPhone,
  register,
  verifyEmailLink,
  fogetpassUpdateEmail,
  resetPasswordDb,
  getAllUserFromDb,
  deleteUserfromDb,
  updateUserfromDb,
} = require("../services/users.service");
const { generateToken } = require("../utils/token");

exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email: email,
    });

    if (user) {
      if (user?.isDeleted === true) {
        throw new Error(
          "Your account has been banned. Please contact the administrator for any enquires."
        );
      }
      // this condition for email verification
      if (user?.isVerified === false)
        throw new Error(
          "Your verification token has already been sent to your email. Please check your email or try again after 15 minutes."
        );
      if (user.isVerified === true) throw new Error("User already exists");
      if (user.email === email) throw new Error("User already exists");
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
    const userData = { ...req.body, userId };
    const newUser = await register(userData);
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
    console.log(email, password);
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
    console.log(token);
    res
      .cookie("accessToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({ success: true, data: token });
  } catch (error) {
    res.status(500).json({
      status: "fail",

      message: error.message,
    });
  }
};

// get all user for dashbaord
exports.getAllUser = async (req, res) => {
  try {
    const { page, limit, search } = req.query;
    const result = await getAllUserFromDb(page, limit, search);
    res.status(200).json({
      status: "success",
      message: "Successfully get ",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't  find ",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateUserfromDb(id, req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully Updated ",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't find",
      error: error.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUserfromDb(id);
    res.status(200).json({
      status: "success",
      message: "Successfully Updated ",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Couldn't find",
      error: error.message,
    });
  }
};

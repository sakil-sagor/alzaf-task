const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,

      required: true,
    },
    dateOfBirth: {
      type: Date,
    },

    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email address",
      },
      required: true,
    },
    promotionSms: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["moderator", "admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

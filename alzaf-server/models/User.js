const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      maxLength: [100, "Name is too large"],
      default: "N/A",
    },
    bio: {
      type: String,
      maxLength: [300, "Bio is too large"],
      default: "Add Bio",
    },
    profile: {
      type: String,
      validate: {
        validator: (value) =>
          validator.isURL(value, {
            protocols: ["http", "https"],
            require_tld: true,
            require_protocol: true,
          }),

        message: "Invalid image URL",
      },
    },
    fatherName: {
      type: String,
      default: "N/A",
    },
    phone: {
      type: String,
      default: "N/A",
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
    address: {
      type: String,
      default: "N/A",
    },
    company: {
      type: String,
      default: "N/A",
    },
    role: {
      type: String,
      enum: ["moderator", "admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    package: {
      name: {
        type: String,
        enum: ["free", "monthly", "yearly"],
        default: "free",
      },
      activeDate: {
        type: Date,
        default: Date.now,
      },
      lastDate: {
        type: Date,
        default: Date.now,
      },
    },
    selectedCategories: [{ type: String }],
    emailNotification: {
      type: Boolean,
      default: false,
    },
    social: {
      linkedin: {
        type: String,
      },
      facebook: {
        type: String,
      },
      whatsApp: {
        type: String,
        default: "N/A",
      },
    },
    isVerified: {
      type: Boolean,
      default: true,
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

// Hash password
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model("User", UserSchema);
module.exports = User;

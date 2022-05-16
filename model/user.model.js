const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [40, "Name should be under 40 character"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      validate: [validator.isEmail, "Please enter a correct email."],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password should be at least 6 character"],
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
    photo: {
      id: {
        type: String,
      },
      secure_url: {
        type: String,
        default:
          "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
      },
    },
    bio: String,
    website: String,
    location: String,
    banner: {
      id: {
        type: String,
      },
      secure_url: {
        type: String,
        default:
          "https://res.cloudinary.com/ionvu-store/image/upload/v1652603302/user-banners/0ba3d60362c7e6d256cfc1f37156bad9_r7zwji.jpg",
      },
    },

    followersCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },

    followers: [mongoose.Schema.Types.ObjectId],
    followings: [mongoose.Schema.Types.ObjectId],

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { timestamps: true }
);

//hooks - encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

//validate password method
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//create JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// generate forgot password token (string)
userSchema.methods.getForgotPasswordToken = function () {
  //create a random string
  const token = crypto.randomBytes(20).toString("hex");
  //get a hash - store it to backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;
  return token;
};

module.exports = mongoose.model("User", userSchema);

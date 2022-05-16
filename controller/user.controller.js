const User = require("../model/user.model");
const cloudinary = require("cloudinary");
const crypto = require("crypto");
const cookieToken = require("../utils/cookieToken");
const maileHelper = require("../utils/emailHelper");
const { send } = require("process");
const { default: mongoose } = require("mongoose");

// SIFNUP
exports.signup = async (req, res) => {
  let user;
  let result;
  const { name, email, password, username } = req.body;
  if (!email || !name || !password || !username)
    return res
      .status(400)
      .json({ success: false, errror: "Name, email and password are requied" });

  if (req.files) {
    let file = req.files.photo;
    result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "user-photos",
      width: 150,
      crop: "scale",
    });
  }

  try {
    user = await User.create({
      name,
      email,
      password,
      username,
      photo: {
        id: result?.public_id,
        secure_url: result?.secure_url,
      },
    });
  } catch (error) {
    const message =
      error.code === 11000 && error.keyValue.email
        ? "User already registerd"
        : "Something went wrong";
    return res.status(400).send({ success: false, message });
  }

  const { token, options } = cookieToken(user);
  res
    .status(201)
    .cookie("token", token, options)
    .json({ user, token, success: true });
};

//LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, errror: "Email and password are requied" });
  }

  try {
    //get user from db
    const user = await User.findOne({ email }).select("+password");

    // if user not exist
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "You are not registerd, create a new account",
      });
    }

    //check password valid or not
    const isValidPassword = await user.isValidPassword(password);

    // if password does not match
    if (!isValidPassword)
      return res
        .status(401)
        .send({ success: false, message: "Email or password does not match" });

    //generate token
    const { token, options } = cookieToken(user);
    user.password = undefined;
    //send response
    res
      .status(200)
      .cookie("token", token, options)
      .json({ success: true, user, token });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

//LOGOUT
exports.logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).send({ success: true, message: "Logout success" });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  //get user from db
  const user = await User.findOne({ email }).select("+password");

  // if user not exist
  if (!user)
    return res.status(404).send({
      success: false,
      message: "You are not registerd, create a new account",
    });
  // generate forgot password token
  const forgotPasswordToken = user.getForgotPasswordToken();

  //save the token to db
  await user.save({ validateBeforeSave: false });

  // create forgot password link
  const url = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${forgotPasswordToken}`;
  try {
    // send email
    await maileHelper(
      user.email,
      "IONVU STORE - Password reset email",
      "Copy  paste this link in your browser or clik bellow link",
      url
    );
    res.status(200).send({ success: true, message: "Email sent successfully" });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).send({ success: false, message: error.message });
  }
};

//RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const token = req.params.token;
  const encryptedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  try {
    // get user from db
    const user = await User.findOne({
      forgotPasswordToken: encryptedToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    //if user  not found or token is not valid
    if (!user)
      return res
        .status(401)
        .send({ success: true, message: "Token is invalid or expired" });

    // if password or confirm password does not match
    if (password !== confirmPassword)
      return res.status(400).send({
        success: true,
        message: "password and confirm password doesnot match",
      });

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    //generate token
    const { token, options } = cookieToken(user);

    //send response
    res.status(200).cookie("token", token, options).send({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    // get user from db
    const user = await User.findById(req.userId);
    // if user not found
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });

    res.status(200).send({ success: true, user });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

// Update password
exports.updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  if (newPassword !== confirmNewPassword)
    return res.status(401).send({
      success: false,
      message: "New password and confirm password does not match",
    });

  try {
    // get user from db
    const user = await User.findById(req.userId).select("+password");
    // if user not found
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    //check password valid or not
    const isValidPassword = await user.isValidPassword(oldPassword);

    // if password does not match
    if (!isValidPassword)
      return res
        .status(401)
        .send({ success: false, message: "password does not match" });

    user.password = newPassword;
    await user.save();
    //generate token
    const { token, options } = cookieToken(user);
    //send response
    res
      .status(200)
      .cookie("token", token, options)
      .send({ success: true, user, token });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

//update user
exports.updateUserDetails = async (req, res) => {
  const { name, email, bio, website, location } = req.body;

  try {
    const user = await User.findById(req.userId);
    // if user not found
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });

    let result;

    if (req.files?.photo) {
      // delete photo if user send a new photo
      if (user.photo.id) await cloudinary.v2.uploader.destroy(user.photo.id);
      // upload the new photo
      result = await cloudinary.v2.uploader.upload(
        req.files.photo.tempFilePath,
        {
          folder: "user-photos",
          width: 150,
          crop: "scale",
        }
      );
    }

    // create photo object
    const photo = {
      id: result?.public_id,
      secure_url: result?.secure_url,
    };

    if (req.files?.banner) {
      // delete photo if user send a new photo
      if (user.banner.id) await cloudinary.v2.uploader.destroy(user.banner.id);

      // upload the new photo
      result = await cloudinary.v2.uploader.upload(
        req.files.banner.tempFilePath,
        {
          folder: "user-banners",
        }
      );
    }

    const banner = {
      id: result?.public_id,
      secure_url: result?.secure_url,
    };
    // update user in db
    const newUser = await User.findByIdAndUpdate(
      user.id,
      {
        name: name || user.name,
        email: email || user.email,
        photo: photo.id ? photo : user.photo,
        banner: banner.id ? banner : user.banner,
        bio,
        website,
        location,
      },
      { new: true }
    );
    res.status(200).send({ success: true, user: newUser });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.followUser = async (req, res) => {
  const { followeeId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.userId,
        followings: {
          $nin: [mongoose.Types.ObjectId(followeeId)],
        },
      },
      {
        $inc: {
          followingCount: 1,
        },
        $push: {
          followings: followeeId,
        },
      },
      { new: true }
    );

    const followee = await User.findOneAndUpdate(
      {
        _id: followeeId,
        followers: {
          $nin: [mongoose.Types.ObjectId(req.userId)],
        },
      },
      {
        $inc: {
          followersCount: 1,
        },
        $push: {
          followers: req.userId,
        },
      },
      { new: true }
    );

    if (!user || !followee)
      return res.status(400).send({
        success: false,
        message: "User not found or already followed",
      });
    res.status(200).send({ success: true, user, followee });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.unFollowUser = async (req, res) => {
  const { followeeId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.userId,
        followings: {
          $in: [mongoose.Types.ObjectId(followeeId)],
        },
      },
      {
        $inc: {
          followingCount: -1,
        },
        $pull: {
          followings: {
            $in: [mongoose.Types.ObjectId(followeeId)],
          },
        },
      },
      { new: true }
    );

    const followee = await User.findOneAndUpdate(
      {
        _id: followeeId,
        followers: {
          $in: [mongoose.Types.ObjectId(req.userId)],
        },
      },
      {
        $inc: {
          followersCount: -1,
        },
        $pull: {
          followers: {
            $in: [mongoose.Types.ObjectId(req.userId)],
          },
        },
      },
      { new: true }
    );
    if (!user || !followee)
      return res.status(400).send({
        success: false,
        message: "User not found or not followed",
      });
    res.status(200).send({ success: true, user, followee });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const followers = await User.find({
      followings: {
        $in: [mongoose.Types.ObjectId(req.userId)],
      },
    });
    res.send({ success: true, followers });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getFollowings = async (req, res) => {
  try {
    const followings = await User.find({
      followers: {
        $in: [mongoose.Types.ObjectId(req.userId)],
      },
    });
    res.send({ success: true, followings });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: {
        $ne: req.userId,
      },
      followers: {
        $nin: [req.userId],
      },
    }).limit(20);
    res.send({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};
exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.send({ success: true, user });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.searchUsers = async (req, res) => {
  const { username } = req.query;
  try {
    const users = await User.find({
      name: {
        $regex: new RegExp(".*"+username+".*", "i"),
      },
    });
    res.send({ success: true, users });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

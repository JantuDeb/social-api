const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is require for adding like"],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Post id is required for adding like"],
  },
});

module.exports = mongoose.model("Like", likeSchema);

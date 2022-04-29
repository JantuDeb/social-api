const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
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
  parentId: {
    type: String,
    default: null,
  },
  body: {
    type: String,
    required: [true, "Write something"],
  },
  photoUrl: {
      type:String,
      default:""
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
  },
});

module.exports = mongoose.model("Comment", commentSchema);

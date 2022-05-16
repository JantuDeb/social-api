const mongoose = require("mongoose");

const bookMarkSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is require for add playlist"],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", bookMarkSchema);

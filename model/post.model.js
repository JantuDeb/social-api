const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is require for add post"],
    },
    description: {
      type: String,
      required: [true, "Description is require"],
      trim: true,
    },

    videoURL: {
      id: String,
      url: String,
    },

    image: {
      id: String,
      url: String,
    },

    tags: [
      {
        type: String,
        default: "",
      },
    ],
    
    likes: [mongoose.Schema.Types.ObjectId],

    statistics: {
      viewCount: {
        type: Number,
        default: 0,
      },
      likeCount: {
        type: Number,
        default: 0,
      },
      favoriteCount: {
        type: Number,
        default: 0,
      },
      commentCount: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

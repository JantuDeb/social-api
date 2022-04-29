const Like = require("../model/like.model");
const Post = require("../model/post.model");
exports.addLike = async (req, res) => {
  const { postId } = req.body;
  if (!postId)
    return res.status(400).send({ success: false, error: "Provide a post ID" });

  try {
    const like = await Like.exists({ post: postId, user: req.userId });
    if (like)
      return res
        .status(400)
        .send({ success: false, error: "You already liked this post" });

    await Post.findByIdAndUpdate(
      { _id: postId },
      {
        $inc: {
          "statistics.likeCount": 1,
        },
      }
    );
    let newLike = await Like.create({ post: postId, user: req.userId });
    newLike = await newLike.populate("post");
    if (!newLike)
      return res
        .status(404)
        .send({ success: false, error: "Something went wrong" });

    res.status(201).send({ success: true, like: newLike });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.removeLike = async (req, res) => {
  const { postId } = req.params;
  if (!postId)
    return res.status(400).send({ success: false, error: "Provide a post ID" });

  try {
    await Post.findByIdAndUpdate(
      { _id: postId },
      {
        $inc: {
          "statistics.likeCount": -1,
        },
      }
    );
    const like = await Like.findOneAndDelete({
      post: postId,
      user: req.userId,
    });
    if (!like)
      return res
        .status(404)
        .send({ success: false, error: "This post not in like" });

    res.status(200).send({ success: true, like });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getLikedPostByUser = async (req, res) => {
  try {
    const likes = await Like.find({ user: req.userId }).populate("post");
    if (!likes || likes.length === 0)
      return res
        .status(404)
        .send({ success: false, error: "No post found in your like list" });

    res.status(200).send({ success: true, likes });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

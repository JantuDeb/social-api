const Comment = require("../model/comment.model");
const User = require("../model/user.model");

exports.addComment = async (req, res) => {
  const { postId, parentId, body } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user)
      return res
        .status(401)
        .send({ success: false, message: "You need to login first" });
    const { name, photo } = user;
    const comment = await Comment.create({
      user: req.userId,
      post: postId,
      parentId: parentId ? parentId : null,
      body,
      photoUrl: photo?.secure_url,
      userName: name,
    });

    if (!comment)
      return res
        .status(400)
        .send({ success: false, message: "Failed to create comment" });

    res.status(201).send({ success: true, comment });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ user: req.userId, post: postId });
    if (!comments)
      return res
        .status(404)
        .send({ success: false, message: "No comments found" });
    res.status(200).send({ success: true, comments });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment)
      return res
        .status(400)
        .send({ success: false, message: "Failed to delete comment" });
    res.status(200).send({ success: true, comment });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { body } = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      {
        body,
      }, {new:true}
    );
    if (!comment)
      return res
        .status(400)
        .send({ success: false, message: "Failed to update comment" });
    res.status(200).send({ success: true, comment });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

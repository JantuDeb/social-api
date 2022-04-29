const express = require("express");
const {
  addComment,
  getComments,
  deleteComment,
  updateComment,
} = require("../controller/comment.controller");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router.route("/post/comment").post(isAuthenticated, addComment);

router.route("/post/comment/:postId").get(isAuthenticated, getComments);
router
  .route("/post/comment/:commentId")
  .delete(isAuthenticated, deleteComment)
  .patch(isAuthenticated, updateComment);

module.exports = router;

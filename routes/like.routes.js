const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  addLike,
  removeLike,
  getLikedPostByUser
} = require("../controller/like.controller");

router
  .route("/user/likes")
  .get(isAuthenticated, getLikedPostByUser)
  .post(isAuthenticated, addLike)

router
  .route("/user/like/:postId")
  .delete(isAuthenticated, removeLike);


module.exports = router;

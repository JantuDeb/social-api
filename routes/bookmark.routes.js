const express = require("express");
const {
  addToBookmark,
  removeBookmark,
  getBookmarks,
} = require("../controller/bookmark.controller");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router
  .route("/user/bookmarks")
  .post(isAuthenticated, addToBookmark)
  .get(isAuthenticated, getBookmarks);

router
  .route("/user/bookmark/:postId")
  .delete(isAuthenticated, removeBookmark);

module.exports = router;

const Bookmark = require("../model/bookmark.model");
exports.addToBookmark = async (req, res) => {
  const { postId } = req.body;
  try {
    const isExist = await Bookmark.exists({ post: postId, user: req.userId });
    if (isExist)
      return res
        .status(409)
        .send({ success: false, message: "Already in bookmark" });
    const bookmark = await Bookmark.create({ user: req.userId, post: postId });
    if (!bookmark)
      return res
        .status(400)
        .send({ success: false, message: "Failed to create bookmark" });

    res.status(200).send({ success: true, bookmark });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.removeBookmark = async (req, res) => {
  const { postId } = req.params;
  try {
    const bookmark = await Bookmark.findOneAndDelete({ post: postId });
    if (!bookmark) return res.status(400).send({ success: false, bookmark });
    res.status(200).send({ success: true, bookmark });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.userId,
    }).populate({
      path: "post",
      populate: {
        path: "user",
        select: "photo name",
      },
    });
    if (!bookmarks || bookmarks.length === 0)
      return res
        .status(404)
        .send({ success: false, message: "No bookmarks found" });
    const filterredBookmarks = bookmarks.filter(
      (bookmark) => bookmark.post !== null
    );
    res.status(200).send({ success: true, bookmarks: filterredBookmarks });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

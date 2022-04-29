const Watch = require("../model/watch-later");
exports.addToWatchLater = async (req, res) => {
  const { videoId } = req.body;
  if (!videoId)
    return res
      .status(400)
      .send({ success: false, error: "Provide a video id" });

  try {
    const watchLater = await Watch.exists({ video: videoId, user: req.userId });
    if (watchLater)
      return res
        .status(400)
        .send({ success: false, error: "Already in watch later" });

    let newWatch = await Watch.create({ video: videoId, user: req.userId });
    newWatch = await newWatch.populate("video");

    if (!newWatch)
      return res
        .status(404)
        .send({ success: false, error: "Something went wrong" });

    res.status(201).send({ success: true, watchLater: newWatch });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.removeWatchLater = async (req, res) => {
  const { videoId } = req.params;
  if (!videoId)
    return res
      .status(400)
      .send({ success: false, error: "Provide a video ID" });

  try {
    const watch = await Watch.findOneAndDelete({
      video: videoId,
      user: req.userId,
    });
    if (!watch)
      return res
        .status(404)
        .send({ success: false, error: "This video not in watch later" });

    res.status(200).send({ success: true, watchLater: watch });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getWatchLaterVideosByUser = async (req, res) => {
  try {
    const watchLaters = await Watch.find({ user: req.userId }).populate("video");
    if (!watchLaters || watchLaters.length === 0)
      return res
        .status(404)
        .send({ success: false, error: "No video found in your watch list" });

    res.status(200).send({ success: true, watchLaters });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

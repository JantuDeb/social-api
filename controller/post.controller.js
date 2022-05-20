const cloudinary = require("cloudinary");
const Post = require("../model/post.model");
const User = require("../model/user.model");
exports.addPost = async (req, res) => {
  const { description = "", tags = [] } = req.body;
  if (!description)
    return res
      .status(400)
      .send({ success: false, message: "Please write something" });

  try {
    let imageResponse = {};
    let videoResponse = {};
    if (req.files?.image) {
      imageResponse = await cloudinary.v2.uploader.upload(
        req.files.image.tempFilePath,
        { folder: "post/image" }
      );
    }

    if (req.files?.video) {
      videoResponse = await cloudinary.v2.uploader.upload(
        req.files.video.tempFilePath,
        { folder: "post/video", resource_type: "video" }
      );
    }

    const image = {
      id: imageResponse.public_id,
      url: imageResponse.secure_url,
    };
    const videoURL = {
      id: videoResponse.public_id,
      url: videoResponse.secure_url,
    };

    const post = await Post.create({
      user: req.userId,
      description,
      image,
      tags,
      videoURL,
    });
    const populatedPost = await post.populate("user", "name photo location");
    res.status(201).send({ success: true, post: populatedPost });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
exports.updatePost = async (req, res) => {
  const { description = "", tags = [] } = req.body;
  const { postId } = req.params;
  if (!description)
    return res
      .status(400)
      .send({ success: false, message: "Please write something" });

  try {
    let imageResponse = {};
    let videoResponse = {};
    if (req.files?.image) {
      imageResponse = await cloudinary.v2.uploader.upload(
        req.files.image.tempFilePath,
        { folder: "post/image" }
      );
    }

    if (req.files?.video) {
      videoResponse = await cloudinary.v2.uploader.upload(
        req.files.video.tempFilePath,
        { folder: "post/video", resource_type: "video" }
      );
    }

    const image = {
      id: imageResponse.public_id,
      url: imageResponse.secure_url,
    };
    const videoURL = {
      id: videoResponse.public_id,
      url: videoResponse.secure_url,
    };

    const postObj = {
      description,
      image,
      tags,
      videoURL,
    };
    console.log(postObj);
    if(postObj.image.url === undefined) delete postObj.image
    if(postObj.videoURL.url===undefined) delete postObj.videoURL
    console.log(postObj);

    const post = await Post.findByIdAndUpdate({_id:postId},postObj, {new:true}).populate("user", "name photo location");

    res.status(201).send({ success: true, post });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// get all videos  ---> /api/videos
exports.getPosts = async (req, res) => {
  try {
    // get all videos from db
    const posts = await Post.find()
      .populate("user", "name photo location")
      .sort({ createdAt: -1 });
    // if no videos found return 404
    if (!posts && posts.length === 0)
      return res
        .status(404)
        .send({ success: false, message: "No posts found" });

    // return all videos
    res.status(200).send({ success: true, posts });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId, {}, { lean: true }).populate(
      "user",
      "name photo"
    );
    if (!post)
      return res
        .status(404)
        .send({ success: false, message: "No post found with this id" });

    // return  a video
    res.status(200).send({ success: true, post });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getPostsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.find(
      { user: userId },
      {},
      { lean: true }
    ).populate({
      path: "user",
      select: "name photo",
    });
    if (!posts || posts.length === 0)
      return res
        .status(404)
        .send({ success: false, message: "No posts found for this user" });

    // return  a video
    res.status(200).send({ success: true, posts });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.updateViewCount = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: postId },
      {
        $inc: {
          "statistics.viewCount": 1,
        },
      },
      {
        new: true,
      }
    );
    if (!post)
      return res
        .status(404)
        .send({ success: false, message: "No post found with this id" });
    // return  a video
    res.status(200).send({ success: true, post });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByIdAndDelete({ _id: postId });
    if (!post)
      return res
        .status(404)
        .send({ success: false, message: "No posts found for this user id" });

    // return  a video
    res.status(200).send({ success: true, post });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getUserFeed = async (req, res) => {
  try {
    const { followings } = await User.findById(req.userId);
    const posts = await Post.find({
      $or: [
        {
          user: {
            $in: followings,
          },
        },
        {
          user: req.userId,
        },
      ],
    })
      .populate("user", "name photo location")
      .sort({ createdAt: -1 });
    res.status(200).send({ success: true, posts });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

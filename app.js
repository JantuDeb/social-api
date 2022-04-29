const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const corsConFig = require("./config/cors-config");
const app = express();
require("dotenv").config();
require("./config/database").connect();
//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies and file middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//cors middleware
app.use(cors(corsConFig));

// import all routes
const user = require("./routes/user.routes");
const post = require("./routes/post.routes");
const like = require("./routes/like.routes");
const comment = require("./routes/comment.routes");
const bookmark = require("./routes/bookmark.routes");

//routes middlewares
app.use("/api/v1", user); // user routes
app.use("/api/v1", post); // post routes
app.use("/api/v1", like); // like routes
app.use("/api/v1", like); // like routes
app.use("/api/v1", bookmark); // bookmark routes

module.exports = app;

const User = require("../model/user");

const isAdmin = (req, res, next) => {
  try {
    const user = User.findById(req.userId);
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });

    if (!user.role === "admin")
      return res
        .status(401)
        .send({ success: false, message: "You are not authorized" });
    next();
  } catch (error) {}
};

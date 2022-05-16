const jwt = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.header("Authorization")?.split(" ")[0] === "Bearer" &&
      req.header("Authorization").split(" ")[1]);
  if (!token)
    return res
      .status(404)
      .send({ success: false, message: "Authorization token is requred" });
  try {
    const decodedToken = jwt.decode(token);
    if (!decodedToken)
      return res.status(403).send({ success: false, message: "Invalid token" });
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = isAuthenticated;

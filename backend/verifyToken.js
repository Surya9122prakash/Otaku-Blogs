const jwt = require("jsonwebtoken");
const User = require("./models/User");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization; // Assuming req.userId holds the user's ID

  if (!token) {
    return res.status(401).json({ message: "User Not Authenticated" });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET);
    req.userId = decoded._id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token is not valid." });
  }
};

module.exports = verifyToken;

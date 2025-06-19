require("dotenv").config();
const jwt = require("jsonwebtoken");

function checkUserAccess(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication token missing." });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        console.log("err" + err);

        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Authentication token expired." });
        }
        return res
          .status(401)
          .json({ message: "Invalid authentication token." });
      }
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = checkUserAccess;

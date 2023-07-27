const jwt = require("jsonwebtoken");
const config = require("../config/config");
// Secret key used to sign and verify JWT tokens
const secretKey = config.secret_key;

// Function to generate a JWT token for a given user ID
const generateToken = (userId, userName) => {
  const payload = { userId, userName };
  const options = { expiresIn: "3h" };

  return jwt.sign(payload, secretKey, options);
};

// Middleware function to verify the JWT token from the request header
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  console.log(token);
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log("token verified", decoded, req.headers.authorization);
    // Attach the user ID from the token to the request object for further use
    req.user = { _id: decoded.userId };
    console.log(req.user);
    next();
  });
};

module.exports = { generateToken, verifyToken };

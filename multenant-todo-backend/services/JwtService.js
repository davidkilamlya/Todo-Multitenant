const jwt = require("jsonwebtoken");
const config = require("../config/config");
// Secret key used to sign and verify JWT tokens
const secretKey = config.secret_key;

// Function to generate a JWT token for a given user ID
const generateToken = (userId, userName,email) => {
  const payload = { userId, userName,email };
  const options = { expiresIn: "3h" };

  return jwt.sign(payload, secretKey, options);
};

// Function to set the JWT token as an HTTP-only cookie in the response
const setTokenCookie = (res, token) => {
  // Set the JWT token as an HTTP-only cookie
  res.cookie("jwtToken", token, { httpOnly: true });
};

// Middleware function to verify the JWT token from the request cookies
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    // Attach the user from the token to the request object for further use
    req.user = { _id: decoded.userId, userName: decoded.userName,email:decoded.email };
    console.log(decoded);
    next();
  });
};

module.exports = { generateToken, setTokenCookie, verifyToken };

const express = require("express");
const jwtService = require("../services/JwtService");
const userController = require("../controllers/userController");

const router = express.Router();

// Route: User Registration
router.post("/register", userController.registerUser);

// Route: User Login
router.post("/login", userController.userLogin);

// Route: Get User Profile
router.get("/profile", jwtService.verifyToken, userController.getUserProfile);

// Route: Update User Profile
router.put(
  "/profile",
  jwtService.verifyToken,
  userController.updateUserProfile
);

router.post("/user", jwtService.verifyToken, userController.getUser);

router.get("/logout", userController.userLogout);

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const jwtService = require("../services/JwtService");
const User = require("../models/UserModel");
const userController=require("../controllers/userController")

const router = express.Router();

// Route: User Registration
router.post("/register", userController.registerUser);

// Route: User Login
router.post("/login", userController.userLogin);

// Route: Get User Profile
router.get("/profile", jwtService.verifyToken, userController.getUserProfile);

// Route: Update User Profile
router.put("/profile", jwtService.verifyToken,userController.updateUserProfile);

module.exports = router;

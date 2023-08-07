const express = require("express");
const bcrypt = require("bcrypt");
const jwtService = require("../services/JwtService");
const User = require("../models/UserModel");

// Route: User Registration
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

// Route: User Login
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user doesn't exist or the password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate the JWT token
    const token = jwtService.generateToken(user._id, user.firstName);

    // Set the JWT token as an HTTP-only cookie in the response
    jwtService.setTokenCookie(res, token);

    console.log("User logged in successfully");
    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Failed to log in" });
  }
};

// Route: User Logout
exports.userLogout = (req, res) => {
  // Clear the token cookie by setting an expired cookie
  res.cookie("jwtToken", "", { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: "Logout successful" });
};


// Route: Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    // Get the user ID from the JWT token
    const userId = req.user._id;

    // Find the user by ID and exclude the password field from the response
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

// Route: Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    // Get the user ID from the JWT token
    const userId = req.user._id;

    // Get the updated user data from the request body
    const { firstName, lastName, email } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user data
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Failed to update user profile" });
  }
};

//get single user
exports.getUser = async (req, res) => {
  const { email } = req.body;
 
  try {
  
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
     

      return res.status(404).json({ message: "User not found", user: false });
    } else {
     

      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

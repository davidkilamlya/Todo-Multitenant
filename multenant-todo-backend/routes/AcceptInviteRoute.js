const express = require("express");
const jwt = require("jsonwebtoken");
const TodoList = require("../models/TodoListModel");
const jwtService = require("../services/JwtService");
const router = express.Router();

// Route: Accept a todo list collaboration invitation
router.post("/accept-invite/:listId",jwtService.verifyToken, async (req, res) => {
  try {
    const listId = req.params.listId;
    const { collaboratorEmail, invitationToken } = req.body;

    // Verify the invitation token
    const secretKey = "your-secret-key";

    try {
      const decodedToken = jwt.verify(invitationToken, secretKey);
      if (decodedToken.type !== "invitation") {
        return res.status(400).json({ message: "Invalid invitation token" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Invalid invitation token" });
    }

    // Find the todo list by ID
    const todoList = await TodoList.findById(listId);

    // Check if the todo list exists
    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }

    // Check if the todo list has an invitation for the provided email
    const invitedCollaborator = todoList.collaborators.find(
      (collaborator) => collaborator.email === collaboratorEmail
    );

    if (!invitedCollaborator) {
      return res
        .status(400)
        .json({ message: "Invitation not found for this email" });
    }

    // Check if the invitation token has already been used
    if (todoList.usedInvitationTokens.includes(invitationToken)) {
      return res
        .status(400)
        .json({ message: "Invitation token has already been used" });
    }

    // Mark the invitation token as used
    todoList.usedInvitationTokens.push(invitationToken);

    // Update the todo list collaborators to add the new collaborator
    todoList.collaborators.push({
      email: collaboratorEmail,
      role: "viewer",
    });

    // Save the updated todo list with the new collaborator added and the token marked as used
    const updatedTodoList = await todoList.save();

    res.status(200).json(updatedTodoList);
  } catch (error) {
    console.error("Error accepting invitation:", error);
    res.status(500).json({ message: "Failed to accept invitation" });
  }
});

module.exports = router;

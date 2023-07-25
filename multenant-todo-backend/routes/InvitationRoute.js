const express = require("express");
const TodoList = require("../models/TodoListModel");
const Collaboration = require("../models/CollaborationModel");
const {generateInvitationToken}=require("../services/InvitationTokenService")

const app = express();
const router = express.Router();

// Route: Invite a collaborator to a specific todo list
router.post("/todo-lists/:listId/collaborators/invite", async (req, res) => {
  try {
    const listId = req.params.listId;
    const collaboratorEmail = req.body.email;

    // Find the todo list to add the collaborator to
    const todoList = await TodoList.findById(listId);
    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }

    // Create a new collaboration record with the invitation details
    const newCollaboration = new Collaboration({
      todoListId: listId,
      invitedEmail: collaboratorEmail,
      accepted: false,
      invitationToken: generateInvitationToken(collaboratorEmail,listId)
    });

    await newCollaboration.save();

    res
      .status(201)
      .json({
        data: newCollaboration,
        message: "Collaborator invited successfully",
      });
  } catch (error) {
    console.log("Failed to invite collaborator", error);
    res.status(500).json({ message: "Failed to invite collaborator" });
  }
});

module.exports = router;

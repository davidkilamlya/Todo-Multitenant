const InviteCollaboratorEmail = require("../models/InviteCollaboratorEmailModel");
const TodoList = require("../models/TodoListModel");
const { verifyInvitationToken } = require("../services/InvitationTokenService");

// Route: Accept a todo list collaboration invitation
exports.acceptInvitation = async (req, res) => {
  try {
    const token = req.params.token;

    // Verify the invitation token
    const decodedToken = verifyInvitationToken(token);
    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const { todoListId, email, name, role, userId } = decodedToken;

    // Find the todo list by ID
    const todoList = await TodoList.findById(todoListId);

    // Check if the todo list exists
    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }

    // Check if the email exists in the InviteCollaboratorEmail collection
    const invitedCollaboratorDetails = await InviteCollaboratorEmail.findOne({
      recipientEmail: email,
    });
    console.log(decodedToken, "collaborator", invitedCollaboratorDetails);
    if (!invitedCollaboratorDetails) {
      return res.status(400).json({ message: "Invitation not found " });
    }
    

    // Check if the invitation token has already been used
    if (todoList.usedInvitationTokens.includes(token)) {
      return res
        .status(400)
        .json({ message: "Invitation has already been used" });
    }

    // Update the todo list collaborators to add the new collaborator
    todoList.collaborators.push({
      role: role,
      name: name,
      userId:userId
    });

    // Mark the invitation token as used
    todoList.usedInvitationTokens.push(token);

    // Save the updated todo list with the new collaborator added and the token marked as used
    await todoList.save();

    // Remove the invitation record from the database
    await InviteCollaboratorEmail.deleteOne({
      recipientEmail: email,
    });

    res.status(200).json({
      message: "Invitation accepted successfully",
    });
  } catch (error) {
    console.error("Error accepting invitation:", error);
    res.status(500).json({ message: "Failed to accept invitation" });
  }
};

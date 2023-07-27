const express = require("express");
const TodoList = require("../models/TodoListModel");
const InviteCollaboratorEmail = require("../models/InviteCollaboratorEmailModel");
const jwtService = require("../services/JwtService");
const nodemailer = require("nodemailer");

const router = express.Router();

// Route: Invite a collaborator to a specific todo list
router.post(
  "/todo-lists/:listId/collaborators/invite",
  jwtService.verifyToken,
  async (req, res) => {
    try {
      const listId = req.params.listId;
      const collaboratorEmail = req.body.email;

      // Find the todo list to add the collaborator to
      const todoList = await TodoList.findById(listId);
      if (!todoList) {
        return res.status(404).json({ message: "Todo list not found" });
      }

      // Create a new collaboration record with the invitation details
      const invitationToken = generateInvitationToken(
        collaboratorEmail,
        listId
      );

      // Save the invitation token to the database (if needed)
      const newInviteEmail = new InviteCollaboratorEmail({
        recipientEmail: collaboratorEmail,
        subject: "Invitation to Collaborate on Todo List",
        content: `You have been invited to collaborate on a Todo List. Click the link below to accept the invitation:\n\n${invitationToken}`,
        sentDate: new Date(),
      });

      await newInviteEmail.save();

      // Send the invitation email to the collaborator
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dkilamlya@gmail.com",
          pass: "password",
        },
      });

      const mailOptions = {
        from: "dkilamlya@gmail.com",
        to: collaboratorEmail,
        subject: newInviteEmail.subject,
        text: newInviteEmail.content,
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
         
        } else {
          console.log("Invitation email sent:", info.response);
        }
      });

      res.status(201).json({ message: "Collaborator invited successfully" });
    } catch (error) {
      console.log("Failed to invite collaborator", error);
      res.status(500).json({ message: "Failed to invite collaborator" });
    }
  }
);

module.exports = router;

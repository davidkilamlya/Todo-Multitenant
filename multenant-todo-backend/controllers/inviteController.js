const TodoList = require("../models/TodoListModel");
const InviteCollaboratorEmail = require("../models/InviteCollaboratorEmailModel");
const nodemailer = require("nodemailer");
const {
  generateInvitationToken,
} = require("../services/InvitationTokenService");
const config = require("../config/config");
const { baseUrl } = require("../constant/baseUrl");

// Route: Invite a collaborator to a specific todo list
exports.inviteCollaborator = async (req, res) => {
  try {
    const ownerEmail = req.user.email;
    const listId = req.params.listId;
    const { collaboratorEmail, name, role, userId } = req.body;
    console.log(
      "User idddddddddddddddddddddddddddd>>>>>>>> ",
      userId,
      ownerEmail,
      collaboratorEmail
    );
    // Find the todo list to add the collaborator to
    const todoList = await TodoList.findById(listId);
    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }

    // Check if the collaborator with the provided userId already exists in the collaborators array
    const collaboratorExists = todoList.collaborators.some(
      (collaborator) => String(collaborator.userId) === String(userId)
    );
    if (collaboratorExists) {
      return res.status(400).json({
        message: "Collaborator already exists in the todo list",
        userId,
      });
    }

    // Create a new collaboration record with the invitation details
    const invitationToken = generateInvitationToken(
      collaboratorEmail,
      listId,
      name,
      role,
      userId
    );

    // Save the invitation token to the database (if needed)
    const newInviteEmail = new InviteCollaboratorEmail({
      recipientEmail: collaboratorEmail,
      token: invitationToken,
      subject: "Invitation to Collaborate on Todo List",
      content: `You have been invited to collaborate on a Todo List. Click the link below to accept the invitation:\n\n${invitationToken}`,
      sentDate: new Date(),
    });

    await newInviteEmail.save();

    // Send the invitation email to the collaborator
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: super credentials to authenticate gmail smpt
        user: config.mailUser,
        pass: config.mailPass,
      },
    });
    const inviteLink = `${baseUrl}/accept-invite/${invitationToken}`;
    const mailOptions = {
      from: ownerEmail, // sender address
      to: collaboratorEmail, // list of receivers
      subject: "Task Collaboration invitation ✔", // Subject line

      html:
        "<b>You have been invited to collaborate on a Todo List" +
        `\nClick below to accept the invitation:</b><br/><a href=${inviteLink}>Accept</a><br></br><br></br><span>This link will expire after 1 hour</span>`, // html body
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Invitation email sent:", info.response);
        res.status(201).json({
          message:
            "Invitation email sent and Collaborator invited successfully",
        });
      }
    });

    // res.status(201).json({ message: "Collaborator invited successfully" });
  } catch (error) {
    console.log("Failed to invite collaborator", error);
    res.status(500).json({ message: "Failed to invite collaborator" });
  }
};

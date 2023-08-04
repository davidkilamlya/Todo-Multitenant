const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inviteCollaboratorEmailSchema = new Schema({
  recipientEmail: String, // Email address of the recipient (collaborator)
  subject: String, // Email subject
  token:String, //invite token
  used:{type:Boolean, default: false},
  content: String, // Email content with placeholders for dynamic data
  sentDate: Date, // Date when the email was sent
});

const InviteCollaboratorEmail = mongoose.model(
  "InviteCollaboratorEmail",
  inviteCollaboratorEmailSchema
);

module.exports = InviteCollaboratorEmail;

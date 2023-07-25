const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collaboratorAcceptanceEmailSchema = new Schema({
  recipientEmail: String, // Email address of the recipient (owner of the todo list)
  subject: String, // Email subject
  content: String, // Email content with placeholders for dynamic data
  sentDate: Date, // Date when the email was sent
});

const CollaboratorAcceptanceEmail = mongoose.model(
  "CollaboratorAcceptanceEmail",
  collaboratorAcceptanceEmailSchema
);

module.exports = CollaboratorAcceptanceEmail;

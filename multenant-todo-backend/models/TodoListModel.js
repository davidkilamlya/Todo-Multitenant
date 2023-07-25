const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoItemSchema = new Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
  completed: { type: Boolean, default: false },
});

const collaborationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  role: String,
});

const todoList = new Schema({
  todoListTitle: String,
  todoListDescription: String,
  createdDate: Date,
  owner: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to the owner (User)
  collaborators: [collaborationSchema], // References to collaborators (Users)
  deadlineDate: Date, // Optional field for the entire list's deadline
  todoItems: [
    // An array to store todo items associated with the list
    todoItemSchema,
  ],
  usedInvitationTokens: [String],
  visibility: { type: String, enum: ["private", "public"], default: "private" }, // "private" or "public" visibility setting
  archived: { type: Boolean, default: false }, // Field to indicate if the list is archived, default is "false"
  // Settings for notifications
  dueDate: { type: Boolean, default: true }, // Default value for due date notifications is "true"
  updates: { type: Boolean, default: true }, // Default value for updates notifications is "true"
});

const TodoList = mongoose.model("TodoList", todoList);

module.exports = TodoList;

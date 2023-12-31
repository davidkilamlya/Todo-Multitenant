const TodoList = require("../models/TodoListModel");
const User = require("../models/UserModel");



// Route: get a collaborator to a specific todo list
exports.getCollaborators=async (req, res) => {
    const listId = req.params.listId;
    TodoList.findOne({ _id: listId })
      .populate("collaborators")
      .then((list) => {
        res.json(list.collaborators);
      })
      .catch((err) => {
        res.status(500).json({ message: "Error getting collaborators" });
      });
  }


// Route: Add a collaborator to a specific todo list
exports.addCollaborator=async (req, res) => {
    try {
      const listId = req.params.listId;
      const collaboratorEmail = req.body.email;

      // Find the todo list to add the collaborator to
      const todoList = await TodoList.findById(listId);
      if (!todoList) {
        return res.status(404).json({ message: "Todo list not found" });
      }

      // Check if the collaborator email exists in User model
      const collaborator = await User.findOne({ email: collaboratorEmail });
      if (!collaborator) {
        return res.status(404).json({ message: "Collaborator not found" });
      }

      // Check if the collaborator is already in the collaborators list
      if (
        todoList.collaborators.some((c) => c.userId.equals(collaborator._id))
      ) {
        return res.status(400).json({ message: "Collaborator already added" });
      }

      // Add the collaborator to the todo list
      todoList.collaborators.push({
        userId: collaborator._id,
        role: "viewer",
      });
      await todoList.save();

      res.status(201).json({
        data: collaborator,
        message: "Collaborator added successfully",
      });
    } catch (error) {
      console.log("Failed to add collaborator", error);
      res.status(500).json({ message: "Failed to add collaborator" });
    }
  }


// Route: Update the role of a collaborator within a specific todo list
exports.updateCollaborator=async (req, res) => {
    try {
      const listId = req.params.listId;
      const collaboratorId = req.params.collaboratorId;
      const newRole = req.body.role;

      // Find the todo list to update the collaborator's role
      const todoList = await TodoList.findById(listId);
      if (!todoList) {
        return res.status(404).json({ message: "Todo list not found" });
      }

      // Find the collaborator in the collaborators list
      const collaborator = todoList.collaborators.find(
        (c) => c._id == collaboratorId
      );
      if (!collaborator) {
        return res.status(404).json({ message: "Collaborator not found" });
      }

      // Update the collaborator's role
      collaborator.role = newRole;
      await todoList.save();

      res.status(200).json({
        data: collaborator,
        message: "Collaborator role updated successfully",
      });
    } catch (error) {
      console.log("Failed to update collaborator role", error);
      res.status(500).json({ message: "Failed to update collaborator role" });
    }
  }


// Route: Remove a collaborator from a specific todo list
exports.deleteCollaborator=async (req, res) => {
    try {
      const listId = req.params.listId;
      const collaboratorId = req.params.collaboratorId;

      // Find the todo list to remove the collaborator from
      const todoList = await TodoList.findById(listId);
      if (!todoList) {
        return res.status(404).json({ message: "Todo list not found" });
      }

      // Find the index of the collaborator to remove
      const collaboratorIndex = todoList.collaborators.findIndex(
        (c) => c._id == collaboratorId
      );
      if (collaboratorIndex === -1) {
        return res.status(404).json({ message: "Collaborator not found" });
      }

      // Remove the collaborator from the collaborators list
      todoList.collaborators.splice(collaboratorIndex, 1);
      await todoList.save();
      console.log("collaborator removed successfully");
      res.status(204).json({ message: "collaborator removed successfully" });
    } catch (error) {
      console.log("Failed to remove collaborator", error);
      res.status(500).json({ message: "Failed to remove collaborator" });
    }
  }


// Route: Delete all collaborators from a specific todo list
exports.deleteAllCollaborators = async (req, res) => {
  try {
    const listId = req.params.listId;

    // Find the todo list to remove all collaborators from
    const todoList = await TodoList.findById(listId);
    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }

    // Remove all collaborators from the collaborators list
    todoList.collaborators = [];
    await todoList.save();

    res.status(204).json({ message: "All collaborators removed successfully" });
  } catch (error) {
    console.log("Failed to remove collaborators", error);
    res.status(500).json({ message: "Failed to remove collaborators" });
  }
};



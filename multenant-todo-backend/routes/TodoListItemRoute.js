const express = require("express");
const TodoList=require("../models/TodoListModel")
const router = express.Router();

// Route: Create a new todo list item for a specific todo list
router.post("/todo-lists/:listId/todo-items", async (req, res) => {
  try {
    const listId = req.params.listId;
    // Extract todo item properties from the request body
    const { title, description, dueDate, priority } = req.body;

    // Create the new todo item
    const newTodoItem = {
      title,
      description,
      priority,
      dueDate: new Date(dueDate),
      completed: false,
    };

    // Find the todo list to add the item to
    const todoList = await TodoList.findById(listId);
    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }

    // Add the new todo item to the todo list
    todoList.todoItems.push(newTodoItem);
    await todoList.save();

    res.status(201).json(newTodoItem);
  } catch (error) {
    console.log("Failed to create todo item", error);
    res.status(500).json({ message: "Failed to create todo item" });
  }
});

// Route: Update a todo list item within a specific todo list
router.put("/todo-lists/:listId/todo-items/:itemId", async (req, res) => {
  try {
    const listId = req.params.listId;
    const itemId = req.params.itemId;
    // Extract todo item properties from the request body
    const { title, description, dueDate, completed } = req.body;

    // Find the todo list to update the item in
    const todoList = await TodoList.findById(listId);
    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }

    // Find the index of the todo item to update
    const itemIndex = todoList.todoItems.findIndex(
      (item) => item._id == itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Todo item not found" });
    }

    // Update the todo item properties
    const updatedTodoItem = {
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      completed,
    };

    // Update the todo item in the todo list
    todoList.todoItems[itemIndex] = updatedTodoItem;
    await todoList.save();

    res.status(200).json(updatedTodoItem);
  } catch (error) {
    console.log("Failed to update todo item", error);
    res.status(500).json({ message: "Failed to update todo item" });
  }
});

// Route: Delete a todo list item within a specific todo list
router.delete("/todo-lists/:listId/todo-items/:itemId", async (req, res) => {
  try {
    const listId = req.params.listId;
    const itemId = req.params.itemId;

    // Find the todo list to delete the item from
    const todoList = await TodoList.findById(listId);
    if (!todoList) {
      return res.status(404).json({ message: "Todo list not found" });
    }

    // Find the index of the todo item to delete
    const itemIndex = todoList.todoItems.findIndex(
      (item) => item._id == itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Todo item not found" });
    }

    // Remove the todo item from the todo list
    todoList.todoItems.splice(itemIndex, 1);
    await todoList.save();

    res.status(204).json(); // No content response
  } catch (error) {
    console.log("Failed to delete todo item", error);
    res.status(500).json({ message: "Failed to delete todo item" });
  }
});

module.exports = router;
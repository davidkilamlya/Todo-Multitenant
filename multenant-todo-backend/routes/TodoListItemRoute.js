const express = require("express");
const router = express.Router();
const jwtService = require("../services/JwtService");
const todoListItemController = require("../controllers/todoListItemController");

// Route: Create a new todo list item for a specific todo list
router.post(
  "/:listId/todo-items/",
  jwtService.verifyToken,
  todoListItemController.createTodoItem
);


// Route: Get all todo items within a specific todo list
router.get(
  "/:listId/todo-items",
  jwtService.verifyToken,
  todoListItemController.getTodoItems
);

// Route: Update a todo list item within a specific todo list
router.put(
  "/:listId/todo-items/:itemId",
  jwtService.verifyToken,
  todoListItemController.updatedTodoItem
);

// Route: Delete a todo list item within a specific todo list
router.delete(
  "/:listId/todo-items/:itemId",
  jwtService.verifyToken,
  todoListItemController.deleteTodoItem
);

module.exports = router;

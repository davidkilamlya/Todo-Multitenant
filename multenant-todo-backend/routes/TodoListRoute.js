const express = require("express");
const TodoList = require("../models/TodoListModel");
const jwtService = require("../services/JwtService");
const todoListController = require("../controllers/todListController");

const app = express();
const router = express.Router();

router.post(
  "/",
  jwtService.verifyToken,
  todoListController.createTodoList
);

// Route: Get all todo lists
router.get(
  "/",
  jwtService.verifyToken,
  todoListController.getTodoLists
);

//Route: Get single todo list
router.get(
  "/:id",
  jwtService.verifyToken,
  todoListController.getTodoList
);

//Route: update single todo list
router.put(
  "/:id",
  jwtService.verifyToken,
  todoListController.updatedTodoList
);

//Route: delete a particular list

router.delete(
  "/:id",
  jwtService.verifyToken,
  todoListController.deleteTodoList
);

module.exports = router;

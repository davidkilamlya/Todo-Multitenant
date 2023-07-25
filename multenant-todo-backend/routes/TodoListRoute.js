const express = require("express");
const TodoList = require("../models/TodoListModel");

const app = express();
const router = express.Router();

router.post("/todo-lists", async (req, res) => {
  try {
    const { todoListTitle, todoListDescription, deadlineDate } = req.body;
    const ownerId = req.user._id;
    const newTodoList = new TodoList({
      todoListTitle,
      todoListDescription,
      deadlineDate: new Date(deadlineDate),
      createdDate: new Date(),
      owner: ownerId,
      collaborators: [],
      todoItems: [],
    });

    await newTodoList.save();
    res
      .status(201)
      .json({ data: newTodoList, message: "List created successfully" });
  } catch (error) {
    console.log("Fail to create the todo list ", error);
    res.status(500).json({ message: "Failed to create todo list" });
  }
});

// Route: Get all todo lists
router.get("/todo-lists", async (req, res) => {
  try {
    const ownerId = req.user._id;
    const allTodoLists = await TodoList.find({ owner: ownerId });
    res.status(200).json({ data: allTodoLists });
  } catch (error) {
    console.log("Failed to get list ", error);
    res.status(500).json({ message: "Failed to get lists" });
  }
});

//Route: Get single todo list
router.get("/todo-lists/:id", async (req, res) => {
  try {
    const listId = req.params.id;
    const todoList = await TodoList.findById(listId);
    if (!todoList) {
      console.log("list not found");
      return res.status(404).json({ message: "list not found" });
    }
    res.status(200).json(todoList);
  } catch (error) {
    console.log("Failed to get particular list");
    res.status(500).json({ message: "Failed to get particular list" });
  }
});

//Route: update single todo list
router.put("/todo-lists/:id", async (req, res) => {
  try {
    const TodoListId = req.params.id;
    const {
      todoListTitle,
      todoListDescription,
      todoItems,
      collaborators,
      deadlineDate,
      archived,
    } = req.body;

    const newTodoList = {
      todoListTitle,
      todoListDescription,
      todoItems,
      collaborators,
      deadlineDate,
      archived,
    };
    const updatedTodoList = await TodoList.findByIdAndUpdate(
      TodoListId,
      newTodoList,
      { new: true }
    );
    if (!updatedTodoList) {
      console.log("the list is not found");
      return res.status(404).json({ message: "todo list not found" });
    }
    res
      .status(200)
      .json({ data: updatedTodoList, message: "List updated successfully" });
  } catch (error) {
    console.log("Failed to update the list", error);
    return res.status(500).json("Failed to update the list");
  }
});

//Route: delete a particular list

router.delete("/todo-list/:id", async (req, res) => {
  try {
    const todoListId = req.params.id;
    const todoList = await TodoList.findById(todoListId);
    if (!todoList) {
      console.log("List is not found");
      return res.status(404).json({ message: "List not found" });
    }
    await TodoList.findByIdAndDelete(todoListId, todoList);
    res.status(204).json({ message: "List deleted successfully" });
  } catch (error) {
    console.log("Failed to delete list");
    return res.status(500).json({ message: "Failed to delete list" });
  }
});

module.exports = router;

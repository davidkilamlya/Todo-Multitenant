const express = require("express");
const TodoList = require("../models/TodoListModel");
const jwtService = require("../services/JwtService");

const app = express();
const router = express.Router();

exports.createTodoList = async (req, res) => {
  try {
    const { todoListTitle, todoListDescription, deadlineDate } = req.body;
    const ownerId = req.user._id;
    console.log(req.body);

    // console.log(req.user, new Date().getDate());
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
};

// Route: Get all todo lists
exports.getTodoLists = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const allTodoLists = await TodoList.find({ owner: ownerId });
    res.status(200).json({ data: allTodoLists.reverse() });
  } catch (error) {
    console.log("Failed to get list ", error);
    res.status(500).json({ message: "Failed to get lists" });
  }
};

//Route: Get single todo list
exports.getTodoList = async (req, res) => {
  try {
    const listId = req.params.id;
    console.log("id is", listId);

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
};

//Route: update single todo list
exports.updatedTodoList = async (req, res) => {
  try {
    const TodoListId = req.params.id;
    console.log(TodoListId);
    const { todoListTitle, todoListDescription, deadlineDate, archived } =
      req.body;

    console.log(req.body);
    const newTodoList = {
      todoListTitle,
      todoListDescription,
      deadlineDate: new Date(deadlineDate),
      archived,
    };
    const updatedTodoList = await TodoList.findByIdAndUpdate(
      TodoListId,
      newTodoList
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
};

//Route: delete a particular list

exports.deleteTodoList = async (req, res) => {
  try {
    const todoListId = req.params.id;
    const todoList = await TodoList.findById(todoListId);
    if (!todoList) {
      console.log("List is not found");
      return res.status(404).json({ message: "List not found" });
    }
    await TodoList.findByIdAndDelete(todoListId, todoList);
    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    console.log("Failed to delete list");
    return res.status(500).json({ message: "Failed to delete list" });
  }
};

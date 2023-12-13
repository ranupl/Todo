const express = require("express");
const route = express.Router();
const todoController = require("../controller/todoController");

route.post("/create", todoController.createTodo);
route.get("/todos", todoController.getAllTodo);
route.get("/todo/:id", todoController.getTodoById);
route.put("/updateTodo/:id", todoController.updateTodo);
route.delete("/deleteTodo/:id", todoController.deleteTodo);
route.get("/filter", todoController.filterResult);

module.exports = route;

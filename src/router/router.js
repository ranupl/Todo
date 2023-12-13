const express = require("express");
const route = express.Router();
const todoController = require("../controller/todoController");
const userController = require("../controller/userController");

// user route
route.post("/createUser", userController.createUser);
route.get("/users", userController.getAllUser);
route.get("/user/:id", userController.getById);
route.put("/updateUser/:id", userController.updateUser);
route.delete("/deleteUser/:id", userController.deleteUser);
route.get("/filter", userController.filterResult);

// todo route
route.post("/createTodo", todoController.createTodo);
route.get("/todos", todoController.getAllTodo);
route.get("/todo/:id", todoController.getTodoById);
route.put("/updateTodo/:id", todoController.updateTodo);
route.delete("/deleteTodo/:id", todoController.deleteTodo);
route.get("/filter", todoController.filterResult);

module.exports = route;

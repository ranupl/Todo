const express = require("express");
const route = express.Router();
const todoController = require("../controller/todoController");
const userController = require("../controller/userController");
const auth = require("../middleware/auth");

// user route
route.post("/register", userController.createUser);
route.post("/login", userController.login);
route.get("/users", userController.getAllUser);
route.get("/user/:id", userController.getById);
route.put("/updateUser/:id", userController.updateUser);
route.delete("/deleteUser/:id", userController.deleteUser);
route.get("/filter", userController.filterResult);

// todo route
route.post("/createTodo", auth, todoController.createTodo);
route.get("/todos", auth, todoController.getAllTodo);
route.get("/todo/:id", auth, todoController.getTodoById);
route.put("/updateTodo/:id", auth, todoController.updateTodo);
route.delete("/deleteTodo/:id", auth, todoController.deleteTodo);
route.get("/filter", todoController.filterResult);

module.exports = route;

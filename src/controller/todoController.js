const httpError = require("http-errors");
const { TodoDB } = require("../model/todoModel");

async function createTodo(req, res, next) {
  const { title, description, priority, status, dueDate } = req.body;
  try {
    const todo = await TodoDB.findOne({ title });

    const newTodo = new TodoDB({
      title: title,
      description: description,
      priority: priority,
      status: status,
      dueDate: dueDate,
    });

    await newTodo.save();
    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: req.body,
    });
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

async function getAllTodo(req, res, next) {
  const todo = await TodoDB.find();
  try {
    if (todo.length > 0) {
      return res.status(200).json({
        success: true,
        message: "All todos",
        data: todo,
      });
    }
    return next(httpError.NotFound("No todos"));
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

async function getTodoById(req, res, next) {
  const { id } = req.params;
  try {
    const todo = await TodoDB.findOne({ id });
    if (!todo) {
      return next(http.NotFound("Todo not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Todo by Id",
      data: todo,
    });
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

async function updateTodo(req, res, next) {
  const { id } = req.params;
  try {
    let todo = await TodoDB.findOne({ id });
    if (!todo) {
      return next(httpError.NotFound("No todo found"));
    }

    todo = await TodoDB.findOneAndUpdate({ id }, req.body, { new: true });
    await todo.save();
    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: req.body,
    });
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

async function deleteTodo(req, res, next) {
  const { id } = req.params;

  try {
    const todo = await TodoDB.findOneAndDelete({ id });

    if (!todo) {
      return next(httpError.NotFound("Todo not found"));
    }
    return res.status(200).json({
      success: true,
      message: "todo deleted",
      data: todo,
    });
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

async function filterResult(req, res, next) {
  try {
    const { title, description, priority, status } = req.query;
    const filter = {};

    if (title) {
      filter.title = title;
    }
    if (description) {
      filter.description = description;
    }
    if (priority) {
      filter.priority = priority;
    }
    if (status) {
      filter.status = status;
    }

    const todo = await TodoDB.findOne(filter);

    if (!todo) {
      return next(httpError.NotFound("Todo not found"));
    }
    return res.status(200).json({
      success: true,
      message: "todo found",
      data: todo,
    });
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

module.exports = {
  createTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  filterResult,
};

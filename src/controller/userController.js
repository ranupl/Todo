const httpError = require("http-errors");
const { UserDB } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res, next) {
  const { firstname, lastname, email, username, password } = req.body;
  try {
    const user = await UserDB.findOne({ email });

    if (user) {
      return next(httpError.BadRequest("User already exits.."));
    }

    const newUser = new UserDB({
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: password,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: req.body,
    });
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

async function getAllUser(req, res, next) {
  const user = await UserDB.find();
  try {
    if (user.length > 0) {
      return res.status(200).json({
        success: true,
        message: "All users",
        data: user,
      });
    }
    return next(httpError.NotFound("No users"));
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

async function getById(req, res, next) {
  const { id } = req.params;
  const user = await UserDB.findOne({ id });
  try {
    if (!user) {
      return next(http.NotFound("User not found"));
    }
    return res.status(200).json({
      success: true,
      message: "User by Id",
      data: user,
    });
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

async function updateUser(req, res, next) {
  const { id } = req.params;

  try {
    let user = await UserDB.findOne({ id });
    if (!user) {
      return next(httpError.NotFound("No user found"));
    }

    user = await UserDB.findOneAndUpdate({ id }, req.body, { new: true });
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: req.body,
    });
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.params;
  const user = await UserDB.findOneAndDelete({ id });

  try {
    if (!user) {
      return next(httpError.NotFound("User not found"));
    }
    return res.status(200).json({
      success: true,
      message: "user deleted",
      data: req.user,
    });
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

async function filterResult(req, res, next) {
  try {
    const { firstname, lastname, email, username } = req.query;
    const filter = {};

    if (firstname) {
      filter.firstname = firstname;
    }
    if (lastname) {
      filter.lastname = lastname;
    }
    if (email) {
      filter.email = email;
    }
    if (username) {
      filter.username = username;
    }

    const user = await UserDB.findOne(filter);

    if (!user) {
      return next(httpError.NotFound("User not found"));
    }
    return res.status(200).json({
      success: true,
      message: "user found",
      data: user,
    });
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  let isPasswordValid;
  try {
    const user = await UserDB.findOne({ email });
    if (!user) {
      return next(httpError.NotFound("Invalid credentials"));
    }
    if (user.password != password) {
      return next(httpError.NotFound("Invalid Credintials"));
    }

    isPasswordValid = await bcrypt.compare(password, user.password);
    delete user.password;
    const token = jwt.sign({ user }, "todo", { expiresIn: "7d" });
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (err) {
    return next(httpError.InternalServerError(err.message));
  }
}

module.exports = {
  createUser,
  getAllUser,
  getById,
  updateUser,
  deleteUser,
  filterResult,
  login,
};

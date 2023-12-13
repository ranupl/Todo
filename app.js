require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./src/router/router");
const app = express();
require("./src/db/connection");

const PORT = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", route);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.status,
    success: false,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}/`);
});

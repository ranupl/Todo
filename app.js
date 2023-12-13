require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("./src/db/connection");

const PORT = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Get started with todo");
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}/`);
});

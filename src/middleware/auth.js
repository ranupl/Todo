const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  await jwt.verify(token, "todo", (error, user) => {
    if (error) return res.status(403).json({ error: "Forbidden" });
    next();
  });
}

module.exports = authenticateToken;

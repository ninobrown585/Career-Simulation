const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });;
    }
    const token = authHeader.slice(7);
    if (!token) return next();
    try {
      const { id } = jwt.verify(token, JWT);
      const user = await getUserId(id);
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };

  module.exports = logger
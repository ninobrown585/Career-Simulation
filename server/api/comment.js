const router = require("express").Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const db = require("../db");

  
  // Authorize the Token with Id
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
  
  router.get("/me", isLoggedIn, async (req, res, next) => {
   
    try {
        const comments = await prisma.comment.findMany({
          where: {
            userId: parseInt(req.user.id),
            comment: req.body.comment,
          },
        });
        res.send(comments);
      } catch (error) {
        next(error);
      }
  });
  
  router.put("/:id", isLoggedIn, async (req, res, next) => {
    try {
      const comments = await prisma.comment.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          comment: req.body.comment,
        },
      });
      res.send(comments);
    } catch (error) {
      next(error);
    }
  });
  
  // Delete a Comment
  router.delete("/:id", isLoggedIn, async (req, res, next) => {
    try {
      const comments = await prisma.comment.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      console.log(comments)
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  module.exports = router
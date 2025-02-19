const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// PUT data for a review with a reviewId and a userId.
router.put("/:userId/reviews/:reviewId", async (req, res, next) => {
    try {
      const result = await prisma.review.update({
        where: {
          reviewId: Number(req.params.reviewId),
          userId: Number(req.user.userId)
        },
      });
      res.status(201).send(result);
    } catch (error) {
      next(error);
    }
});

// PUT data for a comment with a commentId and a userId.
router.put("/:userId/comments/:commentId", async (req, res, next) => {
  try {
    const result = await prisma.comment.update({
      where: {
        commentId: Number(req.params.commentId),
        userId: Number(req.user.userId)
      },
      data: {
        text: String(req.body.text)
      }
    });
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

// DELETE review with userId and reviewId
router.delete("/:userId/reviews/:reviewId", async (req, res, next) => {
  try {
    const result = await prisma.review.delete({
      where: {
        reviewId: Number(req.params.reviewId),
        userId: Number(req.user.userId),
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// DELETE comment with userId and commentId

router.delete("/:userId/comments/:commentId", async (req, res, next) => {
  try {
    const result = await prisma.comment.delete({
      where: {
        commentId: Number(req.params.commentId),
        userId: Number(req.user.userId),
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
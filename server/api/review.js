const router = require("express").Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const db = require("../db");


// Get Reviews Made by a User
router.get("/me", async (req, res, next) => {
    try {
      const reviews = await prisma.review.findMany({
        where: {
          userId: Number(req.user.id),
          review: req.body.review,
        },
      });
      res.send(reviews);
    } catch (error) {
      next(error);
    }
  });

/* Update a review */

router.put("/:id", async (req, res, next) => {
    try {
        const review = await prisma.review.update({
                where: {
                    id: Number(req.params.id)
                },
                data: {                   
                    rating: Number(req.body.rating),
                    review: req.body.review
                }
            })
        
        if (!review) {
            return res.status(404).send("Review not found");
        }

        res.send(review);
    } catch(error) {
        next(error);
    }
});

// Get Individual Item Reviews
router.get("/:id/reviews", async (req, res, next) => {
    try {
      const reviews = await prisma.reviews.findMany({
        where: {
            review: req.body.review,
          itemId: Number(req.params.id)
          
        },
      });
      res.send(reviews);
    } catch (error) {
      next(error);
    }
  });

router.delete("/:id", async (req, res, next) => {
    try {
        const review = await prisma.review.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!review) {
            return res.status(404).send("Review not found");
        }
        res.send(review);     
    } catch (error) {
        next(error);       
    }
});

module.exports = router;
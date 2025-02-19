const router = require("express").Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const db = require("../db");


router.get("/", async (req, res, next) => {
    try {
        const items = await prisma.item.findMany({
            include: {
                review: true
            }
        });

        res.send(items);
    } catch (error) {
        next(error);
    }
});

/* Get item by id */

router.get("/:id", async (req, res, next) => {
    try {
      const item = await prisma.Item.findUnique({
        where: {
          id: Number(req.params.id)
        }
      })
      if (!item) {
        return res.status(404).send("Item not found.");
      }
  
      res.send(item);
    } catch (error) {
      next(error);
    }
  });

  /* Create an item */

  router.post("/", async (req, res, next) => {
    try {
        const item = await prisma.Item.create({
            // // where: {
            // //     id: req.params.id
            // },
            data: {
                name: req.body.name,
                description: req.body.description
            }
        })
        if (!item) {
            return res.status(404).send("Item not found");
        }
        res.send(item);
    } catch (error) {
        next(error);
    }
  });

  /* Update an item */

  router.put("/:id", async (req, res, next) => {
    try {
        const item = await prisma.Item.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name,
                description: req.body.description
            }
        })
        if (!item) {
            return res.status(404).send("Item not found")
        }
        res.send(item);
    } catch (error){
        next(error);
    }
  });

  /* Delete an item */

  router.delete("/:id", async (req, res, next) => {
    try {
        const item = await prisma.Item.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!item) {
            return res.status(404).send("Item not found");
        }
        res.send(item);
    } catch (error) {
        next(error);
    }
  });

module.exports = router
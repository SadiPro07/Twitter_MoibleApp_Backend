import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const router = Router();
const prisma = new PrismaClient();
// create tweet
router.post("/", async (req, res) => {
    const { content, image, userId } = req.body;
    // @ts-ignore
    const user = req.user;
  try {
      const result = await prisma.tweet.create({
          data: {
              content,
              image,
              userId: user.id
          },
          include: { user: true },
      });
    console.log(req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went Wrong . " });
  }
});

// list tweets
router.get("/", async (req, res) => {
  console.log("tweert");
  try {
    const allTweet = await prisma.tweet.findMany({
      include: {
        user: { select: { id: true, name: true, Username: true, image: true } },
      },
    });
    res.json(allTweet);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went Wrong . " });
  }
});

// get one tweet
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await prisma.tweet.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });
    res.json(tweet);
  } catch (error) {
    res.status(400).json({ error: "Something went Wrong . " });
  }
});

// update tweet
router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(500).json({ error: `not Implemented ${id}` });
});

// delete tweet
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await prisma.tweet.delete({ where: { id: Number(id) } });
    res.sendStatus(200);
  } catch (error) {
    res.status(200).json({ error: `Cannot Deleted` });
  }
});

export default router;

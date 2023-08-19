import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();
// create tweet
router.post("/", async (req, res) => {
    try {
        const {content, image, userId } = req.body;
        const result = await prisma.tweet.create({data: req.body})
        console.log(req.body);
        res.json(result);
    }
    catch (error) {
        console.log(error)
        res.status(400).json({error:"Something went Wrong . "});
    }
    
})

// list tweets
router.get("/", async (req, res) => {
    try 
    {
    const allTweet = await prisma.tweet.findMany();
    res.json(allTweet);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({error:"Something went Wrong . "});
    }
})


// get one tweet
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {

        const tweet = await prisma.tweet.findUnique({ where: { id: Number(id) } })
        res.json(tweet);
    }
    catch (error) 
    {
        res.status(400).json({error:"Something went Wrong . "});
    }
})

// update tweet
router.put("/:id", (req, res) => {
    const { id } = req.params;
    res.status(500).json({ error: `not Implemented ${id}` });
})


// delete tweet
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {    
        const tweet = await prisma.tweet.delete({ where: { id: Number(id) } })
        res.sendStatus(200);
    }
    catch (error) {
        res.status(200).json({ error: `Cannot Deleted` });      
    }
})



export default router;
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();
// create user
router.post("/", async (req, res) => {
    try {
        const { Username, name, email } = req.body;
        const result = await prisma.user.create({data: req.body})
        console.log(req.body);
        res.json(result);
    }
    catch (error) {
        console.log(error)
        res.status(400).json({error:"Something went Wrong . "});
    }
})

// list user
router.get("/", async (req, res) => {
    try 
    {
    const allUser = await prisma.user.findMany();
    res.json(allUser);
    }
    catch (error) {
        console.log(error);
    }
    
})


// get one user 
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: { tweets: true }
    });
    res.status(500).json(user);
})

// update user
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { bio, name } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: {bio, name}
        })

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error });
}

})


// delete user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {    
        const user = await prisma.user.delete({ where: { id: Number(id) } })
        res.sendStatus(200);
    }
    catch (error) {
        res.status(200).json({ error: `Cannot Deleted` });      
    }
  
})



export default router;
import { Router } from "express";


const router = Router();

// create tweet
router.post("/", (req, res) => {
    res.status(500).json({ error: "not Implemented" });
})

// list tweets
router.get("/", (req, res) => {
    res.status(500).json({ error: "not Implemented" });
})


// get one tweet
router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.status(500).json({ error: `not Implemented ${id}` });
})

// update tweet
router.put("/:id", (req, res) => {
    const { id } = req.params;
    res.status(500).json({ error: `not Implemented ${id}` });
})


// delete tweet
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.status(500).json({ error: `not Implemented ${id}` });
})



export default router;
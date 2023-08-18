import { Router } from "express";


const router = Router();

// create user
router.post("/", (req, res) => {
    res.status(500).json({ error: "not Implemented" });
})

// list user
router.get("/", (req, res) => {
    res.status(500).json({ error: "not Implemented" });
})


// get one user 
router.get("/:id", (req, res) => {
    const { id } = req.params;
    res.status(500).json({ error: `not Implemented ${id}` });
})

// update user
router.put("/:id", (req, res) => {
    const { id } = req.params;
    res.status(500).json({ error: `not Implemented ${id}` });
})


// delete user
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.status(500).json({ error: `not Implemented ${id}` });
})



export default router;
import { Router } from "express";

const router = Router();

router.get("/create-order", (req, res) => res.send('created'));

export default router;
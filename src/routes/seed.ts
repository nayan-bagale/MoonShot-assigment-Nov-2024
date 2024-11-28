import express from "express";
import authenticate from "../middleware/authenticate";

const router = express.Router();
router.get("/seed", authenticate, (req, res) => {
  
  res.json({ message: true });
});

export default router;

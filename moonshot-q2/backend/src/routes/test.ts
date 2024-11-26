import express from "express";
import authenticate from "../middleware/authenticate";

const router = express.Router();
router.get("/data", authenticate, (req, res) => {
  const { age_range, gender, date_range } = req.query;
  res.json({ message: true });
});

export default router;

import express from "express";
import authenticate from "../middleware/authenticate";
import { getData } from "../services/process-data";
import { OK } from "../constants/status-code";

const router = express.Router();
router.get("/data", authenticate, async (req, res) => {
  const { ageGroup, gender, dateRange, feature } = req.query;
  console.log(req.query);
  const data = await getData(
    ageGroup as any,
    gender as any,
    dateRange as any,
    feature as string
  );
  res.status(OK).json(data);
  return;
});

export default router;

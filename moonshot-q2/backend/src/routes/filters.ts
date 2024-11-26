import express from "express";
import authenticate from "../middleware/authenticate";
import { OK } from "../constants/status-code";
import { getFilters } from "../services/get-filters";

const router = express.Router();

router.get("/filters", authenticate, async (req, res) => {

  const data = await getFilters();
  res.status(OK).json(data);
  return;
});

export default router;

import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { TOKENEXPIRED, UNAUTHORIED } from "../constants/status-code";

interface RequsetT extends Request {
  user: any;
}

const authenticate = (
  req: RequsetT,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(UNAUTHORIED).send("Access denied.");
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
    return;
  } catch (err: any) {
    res.status(TOKENEXPIRED).send("Invalid token.");
    return;
  }
};

export default authenticate;

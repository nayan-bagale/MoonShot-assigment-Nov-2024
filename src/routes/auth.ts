import express from "express";
import bcrypt from "bcrypt";
import { INTERNALERROR, OK, UNAUTHORIED } from "../constants/status-code";
import { prisma } from "../config/db";
import { emailValidation, passwordValidation } from "../utils/validation";
import messages, { SALT } from "../constants/constants";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password){
    res.status(UNAUTHORIED).json({ message: "All fields are required" });
    return;
}

  if (!emailValidation(email).valid) {
    res.status(UNAUTHORIED).json({ message: emailValidation(email).message });
    return;

  }

  const isEmailExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isEmailExist) {
    res.status(UNAUTHORIED).json({ message: "Email already exist" });
    return;

  }

  if (!passwordValidation(password).valid) {
    res.status(UNAUTHORIED).json({ message: passwordValidation(password).message });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, SALT);

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  } catch (e: any) {
    console.log(e);
    res.status(INTERNALERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
    return;

  }

  res.status(OK).json({ message: messages.USER_CREATED });

  res.json({ message: true });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
     res.status(UNAUTHORIED).json({ message: "Email does not exist" });
     return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
     res.status(UNAUTHORIED).json({ message: "Invalid password" });
     return;

  }

  const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: "24h" });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
    secure: true,
    sameSite:'lax'
  });
  res.status(OK).json({ email: user.email, id: user.id });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(OK).json({ message: messages.LOGOUT });
});

router.get("/session", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(UNAUTHORIED).json({ message: messages.UNAUTHORIED });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(OK).json({ email: (decoded as JwtPayload).email });
  } catch (e: any) {
    res.status(UNAUTHORIED).json({ message: e.message });
  }
});

export default router;

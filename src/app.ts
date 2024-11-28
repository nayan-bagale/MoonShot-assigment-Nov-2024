import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import auth from './routes/auth';
import data from "./routes/data";
import filters from './routes/filters'
const app = express();
// Cross Origin Resource Sharing
app.use(
  cors({
    origin: [
      "https://moon-shot-assigment-nov-2024-74t6.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

app.use('/api/auth', auth);

app.use('/api', data);
app.use('/api', filters)


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

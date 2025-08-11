import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth_route from './routes/auth_route.js'
import { rateLimiter } from "./middleware/ratelimiter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));


app.use(express.json());


app.use(rateLimiter);
app.use("/api/users", auth_route);



mongoose
  .connect(process.env.MONGO_URI, { dbName: "social" })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Hello from Express + MongoDB 🚀");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

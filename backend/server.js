import path from "path";
import cors from 'cors';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import tourRoutes from "./routes/tourRoutes.js"
import hotelRoutes from "./routes/hotelRoutes.js"
import cabRoutes from "./routes/cabRoutes.js"
import offerRoutes from "./routes/offerRoutes.js"

connectDB();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend domain
  credentials: true, // Allow credentials
}));
// app.use(cors({
//   origin: 'https://travelsquads.com',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/blog", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/cab", cabRoutes);
app.use("/api/offer", offerRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

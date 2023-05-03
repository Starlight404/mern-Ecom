import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
dotenv.config();

// database config
connectDB();

const app = express();

// midileware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./shoe/build")));

// routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./shoe/build/index.html"));
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ecom</h1>");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgCyan.white);
});

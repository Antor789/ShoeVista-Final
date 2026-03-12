import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// 1. CORS Configuration
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});
app.use((req, res, next) => {
  console.log("--- New Request ---");
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  next();
});
// 2. ROUTES 
// Use the name you imported: 'productRoutes'
// This makes every route in productRoutes start with /api
app.use("/api", productRoutes);

const PORT = process.env.PORT || 5000;

// 3. DATABASE CONNECTION
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`App is connected to the database.`);
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

// 4. SERVER START
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
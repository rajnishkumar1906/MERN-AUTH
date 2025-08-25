import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";

import cors from 'cors'
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

const allowedOrigins = ['http://localhost:5173']
// Middleware
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Routes
app.get('/',(req,res)=>{
    res.send("API Working")
})

app.use("/api/auth", authRoutes);
app.use("/api/user",userRouter)



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

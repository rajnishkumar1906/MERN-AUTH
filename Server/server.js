import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/',(req,res)=>{
    res.send("API Working")
})

app.use("/api/auth", authRoutes);
app.use("/api/user",userRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

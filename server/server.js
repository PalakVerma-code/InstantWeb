import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";  
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
dotenv.config();
connectDB();
 //job to parse cookies in incoming requests and make them available in req.cookies ,mainly used for authentication and session management where we need to read and set cookies for user sessions.

const PORT=process.env.PORT || 3000;
const app=express();
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello world");
})
app.use("/api/auth",authRoute);
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
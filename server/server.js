import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; 
import cors from "cors"; 
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import websiteRoute from "./routes/websiteRoute.js";
dotenv.config();
connectDB();
 //job to parse cookies in incoming requests and make them available in req.cookies ,mainly used for authentication and session management where we need to read and set cookies for user sessions.

const PORT=process.env.PORT || 3000;
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.CLIENT_URL||"http://localhost:5173",
    credentials:true
}));

app.use("/api/auth",authRoute);
app.use("/api/website",websiteRoute);

//http://localhost:5000/api/auth/google
//http://localhost:5000/api/website/generate

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
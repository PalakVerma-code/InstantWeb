//one job- 1. register 2. login 3. logout 4. forgot password 5. reset password
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


//google login
export const googleAuth=async(req,res)=>{
    try{
        
        const {name,email,avatar}=req.body;
        if(!name||!email){
            return res.status(400).json({ success:false, message:"Please Provide all the required fields"});
        }
        let user=await User.findOne({email});
        if(!user){
            user =await User.create({
                name,
                email,
                avatar:avatar || "",
                
            })

        }
        const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||"7d"});
        //set cookie
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000//7 days
        }); 
        //return user
        return res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar,
            credits:user.credits,
            plan:user.plan
        });
    }
    catch(err){
        
        return res.status(500).json({ success:false, message:"Internal Server Error"});
    }

}
//route:GET /api/auth/logout
export const logoutUser=async(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:true,
            sameSite:"none"
        });
        return res.status(200).json({ success:true, message:"User logged out successfully" });
    }catch(err){
        return res.status(500).json({ success:false, message:"Internal Server Error"});
    }
}

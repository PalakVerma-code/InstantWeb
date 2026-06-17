import express from "express"
import { createPayment, verifyPayment } from "../controllers/paymentController.js";
import {protect} from "../middleware/authMiddleware.js";
import { paymentLimiter } from "../middleware/ratelimiter.js";
const router=express.Router();

router.post("/order",protect,paymentLimiter,createPayment);
router.post("/verify",protect,paymentLimiter,verifyPayment);
export default router;

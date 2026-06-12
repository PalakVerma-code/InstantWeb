import express from 'express';
import {generateWebsite} from '../controllers/websiteController.js';
import {protect} from '../middleware/authMiddleware.js';

const router=express.Router();

router.post('/generate',protect,generateWebsite);
export default router;
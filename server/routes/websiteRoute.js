import express from 'express';
import {generateWebsite,
getAllWebsites,getWebsiteById,changeWebsite,deployWebsite,previewWebsite
} from '../controllers/websiteController.js';
import {protect} from '../middleware/authMiddleware.js';
import { generateLimiter,generalLimiter } from '../middleware/ratelimiter.js';


const router=express.Router();

router.post('/generate',protect,generateLimiter,generateWebsite);
router.get('/getAll',protect,generalLimiter,getAllWebsites);
router.get('/getById/:id',protect,generalLimiter,getWebsiteById);
router.put('/update/:id',protect,generateLimiter,changeWebsite);
router.post('/deploy/:id',protect,generalLimiter,deployWebsite);
router.get('/preview/:slug',previewWebsite);
// router.post('/demo',generateDemo);
export default router;
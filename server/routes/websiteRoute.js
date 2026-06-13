import express from 'express';
import {generateWebsite,
getAllWebsites,getWebsiteById,changeWebsite,deployWebsite,previewWebsite
} from '../controllers/websiteController.js';
import {protect} from '../middleware/authMiddleware.js';


const router=express.Router();

router.post('/generate',protect,generateWebsite);
router.get('/getAll',protect,getAllWebsites);
router.get('/getById/:id',protect,getWebsiteById);
router.put('/update/:id',protect,changeWebsite);
router.post('/deploy/:id',protect,deployWebsite);
router.get('/preview/:slug',previewWebsite);
// router.post('/demo',generateDemo);
export default router;
import express from 'express';
import { AccessRole, protect } from '../middleware/authMiddleware.js';
import { Create, GetAllBookingByuser, GetBookingById, Update, UpdateStatus } from '../controllers/tourBookingController.js';

const router=express.Router()

router.get('/user',protect,AccessRole(['user','admin']),GetAllBookingByuser)

router.get('/get/:id',protect,AccessRole(['user','admin']),GetBookingById)

router.post('/create',protect,AccessRole(['user','admin']),Create)

router.put('/update/:id',protect,AccessRole(['user','admin']),Update)

router.put('/updatestatus/:id',protect,AccessRole(['admin','user']),UpdateStatus)

export default router;
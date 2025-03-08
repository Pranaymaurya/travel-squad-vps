import {Router} from 'express';
import { AccessRole, admin, protect } from '../middleware/authMiddleware.js';
import GetAllBookingByHotelId, { Create, GetAllBooking, GetAllBookingUser, GetBookingById, Update, UpdateStatus }  from '../controllers/BookingController.js';
const BookingRouter = Router();


BookingRouter.get('/:id',protect,GetBookingById);
//get booking by userId 
BookingRouter.get('/user',protect,GetAllBookingUser);
BookingRouter.get('/hotel/:id',protect,GetAllBookingByHotelId)
BookingRouter.post('/create',protect,Create);
BookingRouter.put('/user/:id',protect,Update);
BookingRouter.put('/status/:id',protect,AccessRole(['admin','hotel']),UpdateStatus);


export default BookingRouter;
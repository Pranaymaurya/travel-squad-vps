import {Router} from 'express';
import { admin, protect } from '../middleware/authMiddleware';
import { Create, GetAllBooking, GetAllBookingById, GetBookingById, Update, UpdateStatus } from '../controllers/BookingController';
const BookingRouter = Router();

BookingRouter.get('/',protect,admin,GetAllBooking);
BookingRouter.get('/:id',protect,GetBookingById);
BookingRouter.get('/user/:id',protect,GetAllBookingById);
BookingRouter.post('/create',protect,Create);
BookingRouter.put('/user/:id',protect,Update);
BookingRouter.put('/status/:id',protect,admin,UpdateStatus);


export default BookingRouter;
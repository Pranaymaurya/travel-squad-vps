import {Router} from 'express'
const CabBookingRouter = Router()
import { protect } from '../middleware/authMiddleware.js'

CabBookingRouter.get('/booking')
export default CabBookingRouter
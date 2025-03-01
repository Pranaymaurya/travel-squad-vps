import {Router} from 'express'
const CabBookingRouter = Router()
import { protect } from '../middleware/authMiddleware'

CabBookingRouter.get('/booking')
export default CabBookingRouter
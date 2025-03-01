import {Router} from 'express'
const CabBookingRouter = Router()
import { AccessRole, protect } from '../middleware/authMiddleware.js'
import { Create, GetAllCabBookingByCab, GetAllCabBookingByUser, GetCabBookingById, Update, UpdateStatus } from '../controllers/CabBookingController.js'

CabBookingRouter.post('/create',protect,Create)
CabBookingRouter.get('/:id',protect,AccessRole(['cab','admin']),GetCabBookingById)
CabBookingRouter.get('/cab/:id',protect,AccessRole(['cab','admin']),GetAllCabBookingByCab)
CabBookingRouter.put('/update/:id',protect,AccessRole(['admin','cab','user']),Update)
CabBookingRouter.put('/update/status/:id',protect,AccessRole(['admin','cab']),UpdateStatus)
CabBookingRouter.get('/user',protect,AccessRole(['admin','user']),GetAllCabBookingByUser)


export default CabBookingRouter
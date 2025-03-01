import express from "express";
const router = express.Router(); 
import {
  getHotels,
  getHotelsById,
  updateHotel,
  UpdateRoom
} from "../controllers/hotelController.js";
import { protect, admin, AccessRole } from "../middleware/authMiddleware.js";

router.route("/").get(getHotels)
router.route("/:id")
.get(getHotelsById)
.put(protect,AccessRole(['admin','hotel']), updateHotel);

router.put("/room/:id",protect,AccessRole(['admin','hotel']),UpdateRoom)
// .post( createBlog);
// router.route("/:id").get(getBlogsById).put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);


export default router;

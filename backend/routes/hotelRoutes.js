import express from "express";
const router = express.Router(); 
import {
  getHotels,
  getHotelsById
} from "../controllers/hotelController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getHotels)
router.route("/:id").get(getHotelsById);
// .post( createBlog);
// router.route("/:id").get(getBlogsById).put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);

export default router;

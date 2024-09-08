import express from "express";
const router = express.Router(); 
import tours from "../data/tour.js";
import {
  getTours,
  getTourById,
//   createBlog,
//   updateBlog,
//   deleteBlog
} from "../controllers/tourController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getTours) 
// .post( createBlog);
router.route("/:id").get(getTourById)
// .put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);

export default router;

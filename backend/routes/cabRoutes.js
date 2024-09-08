import express from "express";
const router = express.Router(); 
import {
  getCabs,
  getCabsById
} from "../controllers/cabController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getCabs)
router.route("/:id").get(getCabsById);
// .post( createBlog);
// router.route("/:id").get(getBlogsById).put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);

export default router;

import express from "express";
const router = express.Router(); 
import blogs from "../data/blogs.js";
import {
  getBlogs,
  getBlogsById,
  createBlog,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getBlogs).post( createBlog);
router.route("/:id").get(getBlogsById).put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);

export default router;
 
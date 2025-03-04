import express from "express";
const router = express.Router(); 
import {
  getCabs,
  getCabsById,
  updateCab
} from "../controllers/cabController.js";
import { protect, admin, AccessRole } from "../middleware/authMiddleware.js";

router.route("/").get(getCabs)
router.route("/:id").get(getCabsById)
.put(protect,AccessRole(['admin','cab']), updateCab); 
// .post( createBlog);
// router.route("/:id").get(getBlogsById).put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);

export default router;

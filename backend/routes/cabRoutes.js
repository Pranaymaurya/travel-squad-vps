import express from "express";
const router = express.Router(); 
import {
  getCabs,
  getCabsById,
  getCabsByUserId,
  updateCab
} from "../controllers/cabController.js";
import { protect, admin, AccessRole } from "../middleware/authMiddleware.js";

router.route("/").get(getCabs)
router.route("/:id").get(getCabsById)
.put(protect,AccessRole(['admin','cab']), updateCab);
router.route("/user/:id").get(getCabsByUserId);
// .post( createBlog);
// router.route("/:id").get(getBlogsById).put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);

export default router;

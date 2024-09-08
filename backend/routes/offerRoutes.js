import express from "express";
const router = express.Router(); 
import {
    getOffers,
} from "../controllers/offerController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getOffers)
//.post( createBlog);
//router.route("/:id").get(getBlogsById).put(protect, admin, updateBlog).delete(protect, admin, deleteBlog);

export default router;
  
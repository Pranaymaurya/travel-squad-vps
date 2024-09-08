import express from "express";
const router = express.Router();
import blogs from "../data/blogs.js";
import {
  getBlogs,
  getBlogsById,
  createBlog,
  updateBlog, 
  deleteBlog,
} from "../controllers/blogController.js"; 
import {
  getTours,
  getTourById,
  deleteTour,
  getCategory,
  getCategoryById,
  deleteCategory,
  addCategory,
  updateCategory,
  updatefoundPackage,
  createPackage
} from "../controllers/tourController.js";
import{
  deleteCab,
  getCabs,
  getCabsById,
  updateCab,
  createCab
} from "../controllers/cabController.js";
import{
  getHotels,
  getHotelsById,
  deleteHotel,
  updateHotel,
  createHotel
} from "../controllers/hotelController.js"
import{
  getUserById,
  getUsers,
  deleteUser,
} from "../controllers/userController.js"
import{
  deleteOffer,
  getOffers,
  getOfferById,
} from "../controllers/offerController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/blog/allblog").get(protect, admin, getBlogs);
router.route("/blog/addBlog").post(protect, admin, createBlog);
router
  .route("/blog/:id")
  .delete(protect, admin, deleteBlog)
  .get(protect, admin, getBlogsById)
  .put(protect, admin, updateBlog);
// router.route("/blog/:blogId").put(protect, admin, updateBlog);
router.route("/tour/alltour").get(protect, admin, getTours);
router
  .route("/tour/alltour/:id")
  .get(protect, admin, getTourById)
  .delete(protect, admin, deleteTour);
router.route("/tour/category").get(protect, admin, getCategory).post(protect, admin, addCategory);
router.route("/tour/category/:id").get(protect, admin, getCategoryById).delete(protect, admin, deleteCategory).put(protect, admin, updateCategory);
router.route("/tour/edit/:id").get(protect, admin, getTourById).put(protect, admin, updatefoundPackage)
router.route("/tour").post(protect, admin, createPackage)

router.route("/cab/allcab").get(protect, admin, getCabs);
router.route("/cab/allcab/:id")
  .get(protect, admin, getCabsById)
  .delete(protect, admin, deleteCab);
  router.route("/cab/edit/:id").get(protect, admin, getCabsById)
  .put(protect, admin, updateCab)
  router.route("/cab").post(protect, admin, createCab)


  router.route("/hotel/allhotel").get(protect, admin, getHotels);
  router.route("/hotel/allhotel/:id")
  .get(protect, admin, getHotelsById)
  .delete(protect, admin, deleteHotel);
  router.route("/hotel/edit/:id")
  .get(protect, admin, getHotelsById)
  .put(protect, admin, updateHotel);
  router.route("/hotel").post(protect, admin, createHotel)

  router.route("/user/alluser").get(protect, admin, getUsers);
  router
  .route("/user/:id")
  .delete(protect, admin, deleteUser)

  router.route("/offer/alloffer").get(protect, admin, getOffers);
router.route("/offer/alloffer/:id")
  .get(protect, admin, getOfferById)
  .delete(protect, admin, deleteOffer);
  // router.route("/cab/edit/:id").get(protect, admin, getCabsById)
  // .put(protect, admin, updateCab)
  // router.route("/cab").post(protect, admin, createCab)


export default router;

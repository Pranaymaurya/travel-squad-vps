import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");
console.log(decoded);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);

      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);

    throw new Error("Not authorized, no token");
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.role=="admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(401);
      throw new Error("Not authorized for this role");
    }
    next();
  };
}


const AccessRole=(roles)=>{
  return (req,res,next) =>{
if(!roles.includes(req.user.role)) return res.status(400).json({message:"Access Denied"})
next()
  }
}

export { protect, admin ,AccessRole};

import express from "express";
import {
  addCourse,
  updateRoleToEducator,
  educatorDashboardData,
  getEducatorCourses,
  getEnrolledStudentsData,
} from "../controllers/educatorController";
import upload from "../configs/multer.js";
import { protectEducator } from "../middlewares/authMiddleware.js";

const educatorRouter = express.Router();

educatorRouter.get("/update-role", updateRoleToEducator);
educatorRouter.post(
  "/add-course",
  upload.single("image"),
  protectEducator,
  addCourse,
);
educatorRouter.get("/courses", protectEducator, getEducatorCourses);
educatorRouter.get("/dashboard", protectEducator, educatorDashboardData);
educatorRouter.get(
  "enrolled-students",
  protectEducator,
  getEnrolledStudentsData,
);

export default educatorRouter;

import express from "express";
import {
  authCheck,
  login,
  logout,
  signup,
  testing,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/authCheck", protectRoute, authCheck);
router.get("/testing", testing);

export default router;

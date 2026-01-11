import express from "express";
import { addFood, getFoods, shareFood, toggleAvailability, getFoodsByGroup, unshareFood, deleteFood, claimFood } from "../controllers/foodController.js";
import {protect} from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, addFood);
router.get("/", protect, getFoods);
router.get("/group/:groupID",protect, getFoodsByGroup);
router.patch("/:id/toggle",protect, toggleAvailability);
router.post("/:id/share",protect, shareFood);
router.post("/:id/unshare",protect, unshareFood);
router.delete("/:id",protect, deleteFood);
router.post("/:id/claim", protect, claimFood);
export default router;

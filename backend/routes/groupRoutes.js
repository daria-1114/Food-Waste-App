import express from "express";
import { createGroup, addUserToGroup, getGroups, getGroupMembers, deleteGroup, getGroupSharedFoods } from "../controllers/groupController.js";
import {protect} from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", protect, createGroup);
router.post("/:groupId/addUser/:userId", protect, addUserToGroup);
router.get("/", protect, getGroups);
router.get('/:groupId/members', protect, getGroupMembers)
router.delete("/:groupId", protect, deleteGroup);
router.get(`/:groupId/shared-foods`, protect, getGroupSharedFoods);

export default router;

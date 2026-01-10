import express from "express";
import { createGroup, addUserToGroup, getGroupMembers } from "../controllers/groupController.js";

const router = express.Router();

router.post("/", createGroup);
router.post("/:groupId/users/:userId", addUserToGroup);
router.get("/:groupId/users", getGroupMembers);

export default router;

import User from "../models/user.js";
import FriendGroup from "../models/friendGroup.js";

export const createGroup = async (req, res) => {
  try {
    const { name, label } = req.body;
    const group = await FriendGroup.create({ name, label });
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addUserToGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const group = await FriendGroup.findByPk(groupId);
    const user = await User.findByPk(userId);
    if (!group || !user) return res.status(404).json({ error: "User or group not found" });
    await group.addMember(user);
    res.json({ message: `User ${userId} added to group ${groupId}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await FriendGroup.findByPk(groupId, { include: { model: User, as: "members" } });
    if (!group) return res.status(404).json({ error: "Group not found" });
    res.json(group.members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

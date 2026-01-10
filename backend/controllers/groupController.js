import User from "../models/user.js";
import Group from "../models/friendGroup.js";

export const createGroup = async (req, res) => {
  try {
    const group = await Group.create({ name: req.body.name });
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addUserToGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    const group = await Group.findByPk(groupId,{
        include: {model:User, as:"members"}
    });
    const user = await User.findByPk(userId,{
        include: { model: Group, as: "groups" }
    });

    if (!group || !user) return res.status(404).json({ error: "User or Group not found" });

    await group.addMember(user); // ✅ instance method
    res.json({ message: `User ${userId} added to group ${groupId}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findByPk(groupId);

    if (!group) return res.status(404).json({ error: "Group not found" });

    const members = await group.getMembers(); // safer than include
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
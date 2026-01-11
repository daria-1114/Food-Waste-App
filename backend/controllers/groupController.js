import User from "../models/user.js";
import FriendGroup from "../models/friendGroup.js";
import GroupMember from "../models/groupMember.js"
// export const createGroup = async (req, res) => {
//   try {
//     const { name, label } = req.body;
//     const group = await FriendGroup.create({ name, label });
//     res.status(201).json(group);
//     await GroupMember.create({
//       UserId: req.user.id, // Comes from 'protect' middleware
//       GroupId: group.id
//     });
//     res.status(201).json(group);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
export const createGroup = async (req, res) => {
  try {
    const { name, label } = req.body;

    // 1. Create the group
    const group = await FriendGroup.create({ name, label });
    console.log("LOG: Group Created with ID ->", group.groupID);

    // 2. Create the link
    const membership = await GroupMember.create({
      UserId: req.user.id,
      GroupId: group.groupID
    });
    console.log("LOG: Membership Created ->", membership.toJSON());

    res.status(201).json(group);
  } catch (err) {
    console.error("LOG: Error in createGroup ->", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const addUserToGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    // 1. Check if user is already in the group
    const existingMember = await GroupMember.findOne({
      where: { GroupId: groupId, UserId: userId }
    });

    if (existingMember) {
      return res.status(400).json({ error: "User is already a member of this group" });
    }

    // 2. Add the user to the group
    await GroupMember.create({
      GroupId: groupId,
      UserId: userId
    });

    res.status(200).json({ message: "User added to group successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getGroups = async (req, res) => {
  try {
    // 1. Find the logged-in user
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: FriendGroup,
          as: "groups", // This must match the 'as' in your initDB associations
          include: [{ model: User, as: "members" }] // This gets member names too
        }
      ]
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    // 2. Return the array of groups the user is part of
    res.json(user.groups || []); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Find the group and include its members (Users)
    const group = await FriendGroup.findByPk(groupId, {
      include: [{
        model: User,
        as: "members", // Must match the 'as' in your initDB.js associations
        attributes: ["id", "name", "email"] // Don't send passwords!
      }]
    });

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.json(group.members);
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ error: err.message });
  }
};
export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const deleted = await FriendGroup.destroy({
      where: { groupID: groupId } // Ensure this matches your PK name (id or groupId)
    });

    if (deleted) {
      res.status(200).json({ message: "Group deleted successfully" });
    } else {
      res.status(404).json({ error: "Group not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
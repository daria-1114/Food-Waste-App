import User from "../models/user.js";
import FriendGroup from "../models/friendGroup.js";
import GroupMember from "../models/groupMember.js";
import FoodProduct from "../models/foodProduct.js";

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
    const existingMember = await GroupMember.findOne({
      where: { GroupId: groupId, UserId: userId }
    });

    if (existingMember) {
      return res.status(400).json({ error: "User is already a member of this group" });
    }

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
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: FriendGroup,
          as: "groups",
          include: [{ model: User, as: "members" }] 
        }
      ]
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.groups || []); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;

    
    const group = await FriendGroup.findByPk(groupId, {
      include: [{
        model: User,
        as: "members", 
        attributes: ["id", "name", "email"] 
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
      where: { groupID: groupId } 
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



export const getGroupSharedFoods = async (req, res) => {
  try {
    const { groupId } = req.params;
    console.log("--- DEBUG START ---");
    console.log("Target Group ID:", groupId);


    const members = await GroupMember.findAll({
     
      where: { GroupId: groupId }, 
      attributes: ['UserId']
    });

    console.log("Members found:", members.length);

    if (members.length === 0) {
      console.log("No members found for this group ID.");
      return res.json([]);
    }

    const userIds = members.map(m => m.UserId);
    console.log("Member User IDs:", userIds);


    const sharedFoods = await FoodProduct.findAll({
      where: {
        UserId: userIds,
        shared: true  
      },
      include: [{ 
        model: User, 
        as: 'owner', 
        attributes: ['name'] 
      },
    { model: User, 
      as: 'claimer', 
      attributes: ['name'], 
      foreignKey: 'claimedBy' 
    }]
    });

    console.log("Foods found:", sharedFoods.length);
    console.log("--- DEBUG END ---");

    res.json(sharedFoods);
  } catch (err) {
    console.error("Backend Error Details:", err);
    res.status(500).json({ error: err.message });
  }
};
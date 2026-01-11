import db from "./database.js";

// IMPORTANT: import models BEFORE sync
import User from "../models/user.js";
import FoodProduct from "../models/foodProduct.js";
import FriendGroup from "../models/friendGroup.js";
import GroupMember from "../models/groupMember.js";

async function initDB() {
  try {
    // relationships
    User.hasMany(FoodProduct, { foreignKey: "UserId" });
    FoodProduct.belongsTo(User, { foreignKey: "UserId", as:'owner' });
   
    User.belongsToMany(FriendGroup, { 
  through: GroupMember, 
  foreignKey: "UserId",  // Force this name
  otherKey: "GroupId",   // Force this name
  as: "groups" 
});

FriendGroup.belongsToMany(User, { 
  through: GroupMember, 
  foreignKey: "GroupId", // Force this name
  otherKey: "UserId",    // Force this name
  as: "members",
  onDelete: 'CASCADE'
});

FoodProduct.belongsTo(User, { foreignKey: "claimedBy", as: 'claimer' });
    // authenticate
    await db.authenticate();
    console.log("DB authenticated");

    // sync
    await db.sync();
    console.log("DB synced");

  } catch (error) {
    console.error("DB init failed:", error);
    throw error;
  }
}

export default initDB;

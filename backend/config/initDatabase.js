import db from "./database.js";


import User from "../models/user.js";
import FoodProduct from "../models/foodProduct.js";
import FriendGroup from "../models/friendGroup.js";
import GroupMember from "../models/groupMember.js";

async function initDB() {
  try {
  
    User.hasMany(FoodProduct, { foreignKey: "UserId" });
    FoodProduct.belongsTo(User, { foreignKey: "UserId", as:'owner' });
   
    User.belongsToMany(FriendGroup, { 
  through: GroupMember, 
  foreignKey: "UserId",  
  otherKey: "GroupId",  
  as: "groups" 
});

FriendGroup.belongsToMany(User, { 
  through: GroupMember, 
  foreignKey: "GroupId", 
  otherKey: "UserId",    
  as: "members",
  onDelete: 'CASCADE'
});

FoodProduct.belongsTo(User, { foreignKey: "claimedBy", as: 'claimer' });
    await db.authenticate();
    console.log("DB authenticated");
    await db.sync();
    console.log("DB synced");

  } catch (error) {
    console.error("DB init failed:", error);
    throw error;
  }
}

export default initDB;

import db from "./database.js";

// IMPORTANT: import models BEFORE sync
import User from "../models/user.js";
import FoodProduct from "../models/foodProduct.js";
import FriendGroup from "../models/friendGroup.js";
import GroupMember from "../models/groupMember.js";

async function initDB() {
  try {
    // relationships
    User.hasMany(FoodProduct, { foreignKey: "userId" });
    FoodProduct.belongsTo(User, { foreignKey: "userId" });

    User.belongsToMany(FriendGroup, { through: GroupMember, as:"groups" });
    FriendGroup.belongsToMany(User, { through: GroupMember, as:"members" });

    // authenticate
    await db.authenticate();
    console.log("DB authenticated");

    // sync
    await db.sync({ alter: true });
    console.log("DB synced");

  } catch (error) {
    console.error("DB init failed:", error);
    throw error;
  }
}

export default initDB;

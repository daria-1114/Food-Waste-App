import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Member = db.define("GroupMember",{
    memberID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // Add these so you can use them in your controllers!
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    GroupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "member" // Useful for "admin" vs "member" later
    }
});

export default Member;
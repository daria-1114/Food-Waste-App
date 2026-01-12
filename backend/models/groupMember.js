import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Member = db.define("GroupMember",{
    memberID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
 
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
        defaultValue: "member" 
    }
});

export default Member;
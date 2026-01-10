import db from "../config/database.js";
import { DataTypes } from "sequelize";

const Group = db.define("FriendGroup",{
    groupID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    label:{
        type: DataTypes.STRING,
        allowNull: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: true
    }
});
export default Group;
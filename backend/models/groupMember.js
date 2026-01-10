import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Member = db.define("GroupMember",{
    memberID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    
})
export default Member;
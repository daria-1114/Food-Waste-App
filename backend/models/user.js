import db from "../config/database.js";
import { DataTypes } from "sequelize";



const User = db.define("User",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING(255),
        allowNull:false,
    }
});


export default User;
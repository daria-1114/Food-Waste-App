import db from "../config/database.js";
import { DataTypes } from "sequelize";
const Food = db.define("FoodProduct",{
    foodID: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    expiration:{
        type: DataTypes.DATE,
        allowNull:false,
    }
});
export default Food;
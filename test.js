import db from './backend/config/database.js';
import user from "./backend/models/user.js";
import food from "./backend/models/foodProduct.js";
import group from "./backend/models/friendGroup.js";
async function test(){
    try {
        await db.authenticate();
        console.log("auth done");

        await db.sync({alter: true});
        console.log("sync done");

        // const alice = await user.create({name:"alice", email:"alice@email.com", password:"45jr"});
        // console.log("user created");

        const avocado = await food.create({name:"avocado", category:"vegetable", expiration:"12/01/2027" });
        console.log("food created");
        
    } catch (error) {
        console.log("error");
    }
}
test();
import express from 'express';
import cors from 'cors';
const PORT = 8000;
//import db from './config/database.js';
import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import initDB from './config/initDatabase.js';


const app = express();
app.use(cors());
app.use(express.json());



app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/groups", groupRoutes);


async function startServer() {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();


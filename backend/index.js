import express from 'express';
import cors from 'cors';
const PORT = process.env.PORT;
//import db from './config/database.js';
import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import initDB from './config/initDatabase.js';


const app = express();
app.use(cors({
  origin:'https://proud-intuition-production-ffd5.up.railway.app',
  credentials:true,
  allowedHeaders:['Content-type', 'Authorization']
}));
app.use(express.static("build"));
app.use(express.json());



app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/groups", groupRoutes);


async function startServer() {
  try {
    await initDB();

    const port = process.env.PORT || 8080; 
    
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();


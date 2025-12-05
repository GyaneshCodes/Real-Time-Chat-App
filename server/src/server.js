import connectDB from "./config/db.config.js";
import { app } from "./app.js";
import dotenv from "dotenv";
import { server } from "./socket/socket.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running at Port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("DataBase Connection FAILED!!", error);
  });

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import Connection from "./database/db.js";
import UserRoutes from "./routes/user.routes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users", UserRoutes);

Connection();
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  console.log(`server listen to the port ${Port}`);
});

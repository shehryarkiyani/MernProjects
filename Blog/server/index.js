import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import Connection from "./database/db.js";
import UserRoutes from "./routes/user.routes.js";
import CategoryRoutes from "./routes/category.routes.js";
import PostRoutes from "./routes/post.routes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/users", UserRoutes);
app.use("/categories", CategoryRoutes);
app.use("/posts", PostRoutes);
Connection();
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  console.log(`server listen to the port ${Port}`);
});

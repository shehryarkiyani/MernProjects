import express from "express";
import Connection from "./database/db.js";
import TodoRoutes from "./routes/todo.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/todo", TodoRoutes);

Connection();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server listen to port ${PORT}`);
});

import express from "express";
import Connection from "./database/db.js";
const app = express();

app.get("/", () => {});

Connection();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server listen to port ${PORT}`);
});

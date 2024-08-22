import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Connection = async () => {
  const USERNAME = process.env.DB_USERNAME;
  const PASSWORD = process.env.DB_PASSWORD;
  const MONGODB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wuutmpz.mongodb.net/Blogs?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

    mongoose.connection.on("connected", () => {
      console.log("Database connected Successfully");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });
    mongoose.connection.on("error", (error) => {
      console.log("Error while connecting with the database ", error.message);
    });
  } catch (err) {
    console.log("error while connecting DB", err.message, MONGODB_URI);
  }
};

export default Connection;

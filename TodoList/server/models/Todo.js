import mongoose from "mongoose";
import { Schema } from "mongoose";

const TodoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);
const todo = mongoose.model("todo", TodoSchema);

export default todo;

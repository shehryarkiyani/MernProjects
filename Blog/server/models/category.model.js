import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: String,
  },
  { timestamps: true }
);

const category = mongoose.model("Category", CategorySchema);

export default category;

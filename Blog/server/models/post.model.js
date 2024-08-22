import mongoose, { Schema } from "mongoose";
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category", // Reference to the Category model
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment", // Reference to the Comment model
      },
    ],
    coverImage: String, // Optional field for the cover image of the post
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;

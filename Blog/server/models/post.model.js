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
    coverImage: {
      type: String,
      required: true,
    }, // Optional field for the cover image of the post
    coverImagePublicId: String, // Add this field to store the public_id
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;

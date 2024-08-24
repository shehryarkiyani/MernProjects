import Post from "../models/post.model.js";
import mongoose from "mongoose";
import { UploadCloudinary } from "../utils/cloudinary.js";
import { v2 as cloundinary } from "cloudinary";
export const AddPost = async (req, res) => {
  try {
    const { title, description, author, categories } = req.body;
    // Check if author ID is provided and valid
    if (!author || !mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ message: "A valid Author ID is required" });
    }
    const categoryIds = categories?.map((category) => {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        throw new Error(`Invalid category ID: ${category}`);
      }
      return new mongoose.Types.ObjectId(category);
    });

    const CoverImageLocalPath = req.file?.path;
    if (!CoverImageLocalPath) {
      return res.status(400).json({ message: "Cover Image is required" });
    }
    const CoverImage = await UploadCloudinary(CoverImageLocalPath);
    console.log(CoverImage, "CloudinaryUploadedImage");
    const newPost = new Post({
      title,
      description,
      author: mongoose.Types.ObjectId.isValid(author)
        ? new mongoose.Types.ObjectId(author)
        : author, // Ensure author ID is in ObjectId format
      categories: categoryIds,
      coverImage: CoverImage?.url || "",
      coverImagePublicId: CoverImage?.public_id || "", // Store the public_id
    });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating post", error: err.message });
  }
};
export const GetAllPost = async (req, res) => {
  try {
    const allPosts = await Post.find({})
      .populate("author", "name email")
      .populate("categories", "name")
      .sort({ createdAt: -1 });
    return res.status(201).json({ posts: allPosts });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating post", error: err.message });
  }
};
export const GetPostDetails = async (req, res) => {
  try {
    const PostDetail = await Post.findById(req.params.id)
      .populate("author", "name email")
      .populate("categories", "name")
      .populate("comments", "comment author");
    if (!PostDetail) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(201).json({ posts: PostDetail });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export const DeletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.coverImagePublicId) {
      await cloundinary.uploader.destroy(post.coverImagePublicId);
    }
    await Post.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating post", error: err.message });
  }
};

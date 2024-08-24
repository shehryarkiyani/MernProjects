import Category from "../models/category.model.js";

export const AddCategory = async (req, res) => {
  try {
    let newCategory = await Category.create(req.body);
    await newCategory.save();
    return res.status(200).json({ category: newCategory });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Category already exist" });
    }
    return res.status(500).json(err.message);
  }
};
export const UpdateCategory = async (req, res) => {
  try {
    await Category.findOneAndUpdate({ _id: req.params.id }, req.body);
    let UpdatedCategory = await Category.findOne({ _id: req.params.id });
    return res.status(200).json({ category: UpdatedCategory });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export const GettAllCategories = async (req, res) => {
  try {
    let AllCategories = await Category.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ categories: AllCategories });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export const DeleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
export const GetCategoryById = async (req, res) => {
  try {
    let CategoryDetail = await Category.findById(req.params.id);
    return res.status(200).json({ category: CategoryDetail });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

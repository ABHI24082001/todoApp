// controllers/category.controller.js
import Category from "../models/category.models.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send({ status: "success", data: categories });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .send({ status: "error", data: "Category not found" });
    }
    res.send({ status: "success", data: category });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.send({ status: "success", data: newCategory });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedCategory) {
      return res
        .status(404)
        .send({ status: "error", data: "Category not found" });
    }
    res.send({ status: "success", data: updatedCategory });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res
        .status(404)
        .send({ status: "error", data: "Category not found" });
    }
    res.send({ status: "success", data: "Category deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

export {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};

// controllers/categories.controller.js

import Category from "../models/category.models.js";

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = new Category({ name });
    await category.save();
    res.send({ status: "success", data: category });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send({ status: "success", data: categories });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
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

const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );
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

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
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
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};


import Product from "../models/product.models.js";

// const products = [
//   { id: 1, name: "Product 1", price: 100, details: "Details of Product 1" },
//   { id: 2, name: "Product 2", price: 200, details: "Details of Product 2" },
//   { id: 3, name: "Product 3", price: 300, details: "Details of Product 3" },
//   { id: 4, name: "Product 4", price: 400, details: "Details of Product 4" },
//   { id: 5, name: "Product 5", price: 500, details: "Details of Product 5" },
//   { id: 6, name: "Product 6", price: 600, details: "Details of Product 6" },
//   { id: 7, name: "Product 7", price: 700, details: "Details of Product 7" },
//   { id: 8, name: "Product 8", price: 800, details: "Details of Product 8" },
//   { id: 9, name: "Product 9", price: 900, details: "Details of Product 9" },
//   { id: 10, name: "Product 10", price: 1000, details: "Details of Product 10" },
// ];

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send({ status: "success", data: products });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.send({ status: "error", data: "Product not found" });
    }
    res.send({ status: "success", data: product });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
};

const addProduct = async (req, res) => {
  const { name, price, details } = req.body;
  try {
    const newProduct = new Product({ name, price, details });
    await newProduct.save();
    res.send({ status: "success", data: newProduct });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, details } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, details },
      { new: true }
    );
    if (!updatedProduct) {
      return res.send({ status: "error", data: "Product not found" });
    }
    res.send({ status: "success", data: updatedProduct });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.send({ status: "error", data: "Product not found" });
    }
    res.send({ status: "success", data: "Product deleted successfully" });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};

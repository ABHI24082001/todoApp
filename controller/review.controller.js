import Product from "../models/product.models.js";

 const addReview = async (req, res) => {
  const { id } = req.params; // Product ID
  const { userId, rating, comment } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = {
      userId,
      rating,
      comment,
    };

    product.reviews.push(review);
    const updatedProduct = await product.save();

    res.status(201).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const getReviews = async (req, res) => {
  const { id } = req.params; // Product ID

  try {
    const product = await Product.findById(id).populate(
      "reviews.userId",
      "name"
    ); // Assuming User model has a 'name' field
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product.reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params; // Product ID and Review ID

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { deleteReview, getReviews, addReview };

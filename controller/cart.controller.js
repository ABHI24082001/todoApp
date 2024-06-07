
import Cart from "../models/cart.models.js";




const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addAllCartById = async (req, res) => {
  const { userId, items } = req.body;

  let totalAmount = 0;
  items.forEach((item) => {
    totalAmount += item.price * item.quantity;
  });

  const newCart = new Cart({
    userId,
    items,
    totalAmount,
  });

  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


 const updateAllCartById = async (req, res) => {
   const { id } = req.params;
   const { items } = req.body;

   if (!items || !Array.isArray(items)) {
     return res
       .status(400)
       .json({ message: "Items must be a non-empty array" });
   }

   let totalAmount = 0;
   items.forEach((item) => {
     totalAmount += item.price * item.quantity;
   });

   try {
     const updatedCart = await Cart.findByIdAndUpdate(
       id,
       { items, totalAmount, updatedAt: Date.now() },
       { new: true, runValidators: true }
     );

     if (!updatedCart) {
       return res.status(404).json({ message: "Cart not found" });
     }

     res.status(200).json(updatedCart);
   } catch (error) {
     res.status(400).json({ message: error.message });
   }
 };


const deleteAllCartById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCart = await Cart.findByIdAndDelete(id);

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export {
  getAllCart,
  addAllCartById,
  updateAllCartById,
  deleteAllCartById,
};
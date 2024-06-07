import Order from "../models/orderss.models.js";

const createOrder = async (req, res) => {
  const { customerName, email, phone, address, items, totalAmount, status } =
    req.body;
  try {
    const newOrder = new Order({
      customerName,
      email,
      phone,
      address,
      items,
      totalAmount,
      status: status || "Pending", // Default to 'Pending' if status is not provided
    });
    await newOrder.save();
    res.status(201).send({ status: "success", data: newOrder });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send({ status: "success", data: orders });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).send({ status: "error", data: "Order not found" });
    }
    res.send({ status: "success", data: order });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { customerName, email, phone, address, items, totalAmount, status } =
    req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { customerName, email, phone, address, items, totalAmount, status },
      { new: true, runValidators: true } // Ensure validators are run on update
    );
    if (!updatedOrder) {
      return res.status(404).send({ status: "error", data: "Order not found" });
    }
    res.send({ status: "success", data: updatedOrder });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).send({ status: "error", data: "Order not found" });
    }
    res.send({ status: "success", data: "Order deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

export { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder };

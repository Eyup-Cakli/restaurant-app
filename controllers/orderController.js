const order = require("../models/concrete/order.js");

// COMMANDS
// create order
const createOrder_post = async (req, res) => {
    try {
      const userId = req.body.userId;
      const restaurantId = req.body.restaurantId;
      const commentId = req.body.commentId;
  
      const newOrder = new order({
        userId: userId,
        restaurantId: restaurantId,
        commentId: commentId,
      });
  
      if (!userId || !restaurantId || !commentId) {
        return res.status(403).json({ error: "All fields must be filled." });
      } else {
        const savedOrder = await newOrder.save();
        return res.status(200).json(savedOrder);
      }
    } catch (err) {
      console.error("Caught an error: ", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // update a order
  const updateOrder_put = async (req, res) => {
    try {
      const orderId = req.params.id;
  
      const newUserId = req.body.userId;
      const newRestaurantId = req.body.restaurantId;
      const newCommentId = req.body.commentId;
  
      if (!newUserId || !newRestaurantId || !newCommentId) {
        return res.status(403).json({ error: "All fields must be filled." });
      }
  
      const existingOrder = await order.findOne({
        _id: orderId,
      });
  
      if (!existingOrder) {
        return res.status(404).json({ error: "Order not found" });
      } else {
        existingOrder.userId = newUserId;
        existingOrder.restaurantId = newRestaurantId;
        existingOrder.commentId = newCommentId;
  
        const savedOrder = await existingOrder.save();
        return res.status(200).json(savedOrder);
      }
    } catch (err) {
      console.error("Caught an error: ", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // delete a order
  const deleteOrder_delete = async (req, res) => {
    try {
      const orderId = req.params.id;
      const existingOrder = await order.findOne({
        _id: orderId,
      });
  
      if (!existingOrder) {
        return res.status(404).json({ error: "Order not found." });
      }
  
      if (existingOrder.isDeleted) {
        return res
          .status(403)
          .json({ error: "This order already deleted." });
      }
  
      if (existingOrder) {
        existingOrder.isDeleted = true;
        await existingOrder.save();
        return res
          .status(200)
          .json({ message: "Order deleted successfully." });
      }
    } catch (err) {
      console.error("Caught an error: ", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // QUERIES
  // get all order
  const getAllOrder_get = async (req, res) => {
    try {
      const orders = await order.find({
        isDeleted: false,
      });
      return res.status(200).json(orders);
    } catch (err) {
      console.err("Caught an error: ", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
  
  // get order by id
  const getOrderById_get = async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await order.findOne({
        _id: orderId,
      });
  
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      if (order.isDeleted) {
        return res.status(403).json({ error: "Order is deleted" });
      } else {
        return res.status(200).json(order);
      }
    } catch (err) {
      console.err("Caught an error: ", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
  
  module.exports = {
    createOrder_post,
    updateOrder_put,
    deleteOrder_delete,
    getAllOrder_get,
    getOrderById_get,
  };
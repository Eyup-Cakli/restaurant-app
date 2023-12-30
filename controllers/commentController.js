const comment = require("../models/concrete/comment");

// COMMANDS
// create comment
const createComment_post = async (req, res) => {
    try {
      const userId = req.body.userId;
      const text = req.body.text;
      const point = req.body.point;
      const restaurantId = req.body.restaurantId;
  
      const newComment = new comment({
        userId: userId,
        restaurantId: restaurantId,
        text: text,
        point: point
      });
  
      if (!userId || !restaurantId) {
        return res.status(403).json({ error: "You must be fill restaurant or user field." });
      } else {
        const savedComment = await newComment.save();
        return res.status(200).json(savedComment);
      }
    } catch (err) {
      console.error("Caught an error: ", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // update a comment
  const updateComment_put = async (req, res) => {
    try {
      const commentId = req.params.id;
  
      const newUserId = req.body.userId;
      const newText = req.body.text;
      const newPoint = req.body.point;
      const newRestaurantId = req.body.restaurantId;
  
      if (!newUserId || !newRestaurantId) {
        return res.status(403).json({ error: "You must be fill restaurant or user field." });
      }
  
      const existingComment = await comment.findOne({
        _id: commentId,
      });
  
      if (!existingComment) {
        return res.status(404).json({ error: "Comment not found" });
      } else {
        existingComment.userId = newUserId;
        existingComment.restaurantId = newRestaurantId;
        existingComment.text = newText;
        existingComment.point = newPoint
  
        const savedComment = await existingComment.save();
        return res.status(200).json(savedComment);
      }
    } catch (err) {
      console.error("Caught an error: ", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // delete a comment
  const deleteComment_delete = async (req, res) => {
    try {
      const commentId = req.params.id;
      const existingComment = await comment.findOne({
        _id: commentId,
      });
  
      if (!existingComment) {
        return res.status(404).json({ error: "Comment not found." });
      }
  
      if (existingComment.isDeleted) {
        return res
          .status(403)
          .json({ error: "This comment already deleted." });
      }
  
      if (existingComment) {
        existingComment.isDeleted = true;
        await existingComment.save();
        return res
          .status(200)
          .json({ message: "Comment deleted successfully." });
      }
    } catch (err) {
      console.error("Caught an error: ", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
  // QUERIES
  // get all comment
  const getAllComment_get = async (req, res) => {
    try {
      const comments = await comment.find({
        isDeleted: false,
      });
      return res.status(200).json(comments);
    } catch (err) {
      console.err("Caught an error: ", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
  
  // get comment by id
  const getCommentById_get = async (req, res) => {
    try {
      const commentId = req.params.id;
      const comment = await comment.findOne({
        _id: commentId,
      });
  
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      if (comment.isDeleted) {
        return res.status(403).json({ error: "Comment is deleted" });
      } else {
        return res.status(200).json(comment);
      }
    } catch (err) {
      console.err("Caught an error: ", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
  
  module.exports = {
    createComment_post,
    updateComment_put,
    deleteComment_delete,
    getAllComment_get,
    getCommentById_get,
  };
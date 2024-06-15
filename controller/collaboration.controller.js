import mongoose from "mongoose";
import Task from "../models/task.models.js";

const shareTask = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).send({ status: "error", data: "Invalid Task ID" });
  }
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send({ status: "error", data: "Task not found" });
    }
    if (!task.sharedWith.includes(userId)) {
      task.sharedWith.push(userId);
      await task.save();
    }
    res.send({ status: "success", data: task });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const assignTask = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).send({ status: "error", data: "Invalid Task ID" });
  }
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).send({ status: "error", data: "Task not found" });
    }
    if (!task.assignedUsers.includes(userId)) {
      task.assignedUsers.push(userId);
      await task.save();
    }
    res.send({ status: "success", data: task });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getTasksForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const tasks = await Task.find({
      $or: [{ assignedUsers: userId }, { sharedWith: userId }],
    });
    res.send({ status: "success", data: tasks });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

export { shareTask, assignTask, getTasksForUser };

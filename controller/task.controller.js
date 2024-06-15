import Task from "../models/task.models.js";
import calculateProgress from "../utils/calculateProgress.js"

const createTask = async (req, res) => {
  const {
    title,
    description,
    dueDate,
    reminder,
    priority,
    categoryId,
    tagIds,
  } = req.body;
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      reminder,
      priority,
      categoryId,
      tagIds,
    });
    await task.save();
    res.send({ status: "success", data: task });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("categoryId tagIds");
    res.send({ status: "success", data: tasks });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId).populate("categoryId tagIds");
    if (!task) {
      return res.status(404).send({ status: "error", data: "Task not found" });
    }
    res.send({ status: "success", data: task });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const {
    title,
    description,
    dueDate,
    reminder,
    priority,
    categoryId,
    tagIds,
    subtasks,
  } = req.body;

  try {
    const progress = calculateProgress(subtasks || []);
    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        dueDate,
        reminder,
        priority,
        categoryId,
        tagIds,
        subtasks,
        progress,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!task) {
      return res.status(404).send({ status: "error", data: "Task not found" });
    }
    res.send({ status: "success", data: task });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).send({ status: "error", data: "Task not found" });
    }
    res.send({ status: "success", data: "Task deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const searchAndFilterTasks = async (req, res) => {
  const { title, dueDate, reminder, priority, categoryId, tagIds } = req.query;

  let filter = {};

  if (title) {
    filter.title = { $regex: title, $options: "i" }; // case-insensitive regex search
  }
  if (dueDate) {
    filter.dueDate = new Date(dueDate);
  }
  if (reminder) {
    filter.reminder = reminder === "true";
  }
  if (priority) {
    filter.priority = priority;
  }
  if (categoryId) {
    filter.categoryId = categoryId;
  }
  if (tagIds) {
    filter.tagIds = { $in: tagIds.split(",") }; // assuming tagIds are comma-separated
  }

  try {
    const tasks = await Task.find(filter);
    res.send({ status: "success", data: tasks });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask , searchAndFilterTasks };

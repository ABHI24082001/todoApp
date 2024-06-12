// controllers/tasks.controller.js

import Task from "../models/task.model.js";
import Category from "../models/category.model.js";
import Tag from "../models/tag.model.js";

const createTask = async (req, res) => {
  const {
    title,
    description,
    dueDate,
    reminder,
    subtasks,
    priority,
    categoryId,
    tagIds,
  } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(400)
        .send({ status: "error", data: "Invalid category ID" });
    }

    const tags = await Tag.find({ _id: { $in: tagIds } });
    if (tags.length !== tagIds.length) {
      return res.status(400).send({ status: "error", data: "Invalid tag IDs" });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      reminder,
      subtasks,
      priority,
      category: categoryId,
      tags: tagIds,
    });

    await task.save();
    res.send({ status: "success", data: task });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

// Other task controller functions...

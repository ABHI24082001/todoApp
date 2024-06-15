import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  reminder: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  tagIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  subtasks: [subtaskSchema],
  progress: { type: Number, default: 0 },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

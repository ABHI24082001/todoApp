// models/task.model.js

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    reminder: {
      type: Boolean,
      default: false,
    },
    subtasks: [
      {
        title: String,
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    progress: {
      type: Number,
      default: 0,
    },
    attachments: [
      {
        type: String,
      },
    ],
    notes: [
      {
        type: String,
      },
    ],
    recurring: {
      frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly"],
      },
      nextOccurrence: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;

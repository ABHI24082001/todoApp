

import Tag from "../models/tag.models.js";

const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const tag = new Tag({ name });
    await tag.save();
    res.send({ status: "success", data: tag });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.send({ status: "success", data: tags });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getTagById = async (req, res) => {
  const { tagId } = req.params;
  try {
    const tag = await Tag.findById(tagId);
    if (!tag) {
      return res.status(404).send({ status: "error", data: "Tag not found" });
    }
    res.send({ status: "success", data: tag });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const updateTag = async (req, res) => {
  const { tagId } = req.params;
  const { name } = req.body;
  try {
    const tag = await Tag.findByIdAndUpdate(tagId, { name }, { new: true });
    if (!tag) {
      return res.status(404).send({ status: "error", data: "Tag not found" });
    }
    res.send({ status: "success", data: tag });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const deleteTag = async (req, res) => {
  const { tagId } = req.params;
  try {
    const tag = await Tag.findByIdAndDelete(tagId);
    if (!tag) {
      return res.status(404).send({ status: "error", data: "Tag not found" });
    }
    res.send({ status: "success", data: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

export {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
};

import Note from "../models/note.model.js";

const createNote = async (req, res) => {
  const { title, content, userId, taskId } = req.body;
  try {
    const note = new Note({
      title,
      content,
      userId,
      taskId,
    });
    await note.save();
    res.send({ status: "success", data: note });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.send({ status: "success", data: notes });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).send({ status: "error", data: "Note not found" });
    }
    res.send({ status: "success", data: note });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { title, content } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );
    if (!note) {
      return res.status(404).send({ status: "error", data: "Note not found" });
    }
    res.send({ status: "success", data: note });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) {
      return res.status(404).send({ status: "error", data: "Note not found" });
    }
    res.send({ status: "success", data: "Note deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

export { createNote, getAllNotes, getNoteById, updateNote, deleteNote };

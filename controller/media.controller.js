// controllers/mediaController.js
import Media from "../models/media.models.js";

const uploadMedia = async (req, res) => {
  const { userId } = req.body;

  // Log the entire request object to check what is being sent
  console.log("Request Body:", req.body);
  console.log("Request File:", req.file);

  if (!req.file) {
    return res
      .status(400)
      .send({ status: "error", data: "No file uploaded or invalid file type" });
  }

  const { filename, path, mimetype, size } = req.file;

  // Log the file details to ensure they are being captured
  console.log("File Details:", req.file);

  try {
    const media = new Media({
      filename,
      path,
      mimeType: mimetype,
      size,
      userId,
    });
    await media.save();
    res.send({ status: "success", data: media });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

// Other controller methods...


const getAllMedia = async (req, res) => {
  const { userId } = req.query;
  try {
    const media = await Media.find({ userId });
    res.status(200).send({ status: "success", data: media });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

const deleteMedia = async (req, res) => {
  const { mediaId } = req.params;
  try {
    const media = await Media.findByIdAndDelete(mediaId);
    if (!media) {
      return res.status(404).send({ status: "error", data: "Media not found" });
    }
    res.send({ status: "success", data: "Media deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};

export { uploadMedia, getAllMedia, deleteMedia };

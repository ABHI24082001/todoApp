import express from "express";
import dbConnect from "./config/dbconnect.js";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes.js";
import Task from "./routes/task.routes.js";
import Category from "./routes/category.routes.js";
import Tag from "./routes/tag.routes.js"
import CollaborationRouter from "./routes/collaboration.routes.js";
import Notes from "./routes/note.routes.js"

const app = express();
dbConnect();
dotenv.config();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", Task);
app.use("/api/v1/categories", Category); 
app.use("/api/v1/tags", Tag); 
app.use("/api/v1/collaboration", CollaborationRouter);
app.use("/api/v1/notes", Notes); 


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

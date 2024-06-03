import express  from "express";
import  dbConnect  from "./config/dbconnect.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import userRouter  from './routes/user.routes.js'
const app = express();
dbConnect()

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

app.use("/api/v1/users", userRouter);

// app.listen(8000,()=>{console.log(`port running at 800`)})

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
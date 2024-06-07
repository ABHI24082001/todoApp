import express  from "express";
import  dbConnect  from "./config/dbconnect.js";
import morgan from "morgan";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRouter  from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import CategoryRouter from './routes/category.routes.js'
import Order from  './routes/orderss.routes.js'



const app = express();
dbConnect()
dotenv.config();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", productRouter)
app.use("/api/v1/users", CategoryRouter);
app.use("/api/v1/users", Order);


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
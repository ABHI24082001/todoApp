import mongoose from "mongoose";
const dbConnect =  ()=>{
try {
    const connection =  mongoose.connect(
      "mongodb+srv://sonukr24082001:Abhi%40123@cluster0.hamldut.mongodb.net/todo"
    );
   if(connection){
    console.log("DB connection established")
   }
    
} catch (error) {
    console.log(error)
}
}
export default dbConnect;
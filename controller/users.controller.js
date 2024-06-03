
import { Users } from "../models/users.models.js";

import jwt from "jsonwebtoken";


const createUser = async (req, res) => {
  const email = req.body.email;

  try {
    const oldUser = await Users.findOne({ email: email });

    if (oldUser) {
      return res.send({ data: "User already exists!!" });
    }

    await Users.create(req.body);
    res.send({ status: "ok", data: "User created" });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
};


const loginUser = async (req , res) => {
  const {email,password} = req.body;
  try {
    const user = await Users.findOne({email: email})
    if (!user){
      return res.send({status: 'error', data: 'User not found'});
    }
   const matched = user.isPasswordMatched(user.password)  
    if (!matched) {
      return res.send({ status: "error", data: "Invalid password" });
    }    
    const token = jwt.sign({userId: user._id , email: user.email}, "your_secret_key" ,{
      expiresIn: "1h",
    });
    res.send({status: 'success', data: {token: token, message: "Login successful "}});
  } catch (error) {
    res.send({status: 'error', data:error.message});  
  }

};


const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  console.log("Update User Params:", userId);
  console.log("Update User Body:", name);

  try {
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return res.send({ status: "error", data: "User not found" });
    }

    res.send({ status: "success", data: updatedUser });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
};





 
export { createUser, loginUser , updateUser };

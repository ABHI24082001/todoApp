
import { Users } from "../models/users.models.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { PasswordResetToken } from "../models/passwordResetToken.js";
import sendEmail from "../utils/sendEmail.js";




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


const viewProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Users.findById(userId).select("-password");

    if (!user) {
      return res.send({ status: "error", data: "User not found" });
    }

    res.send({ status: "success", data: user });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
};

const Deleted = async (req, res) => {
  const { userId } = req.params;

  console.log("Delete User Params:", userId); // Log userId

  try {
    const deletedUser = await Users.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.send({ status: "error", data: "User not found" });
    }

    res.send({ status: "success", data: "User deleted successfully" });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save the token to the database
    await PasswordResetToken.create({
      userId: user._id,
      token: resetToken,
      createdAt: Date.now(),
    });

    // Create reset URL
    const resetUrl = `${process.env.CLIENT_URL}/password-reset/${resetToken}`;

    // Send email
    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message: `You requested a password reset. Please use the following link to reset your password: ${resetUrl}`,
    });

    res.send({ status: "success", data: "Password reset email sent" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};


const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Find the token in the database
    const resetTokenDoc = await PasswordResetToken.findOne({ token });
    if (!resetTokenDoc) {
      return res
        .status(400)
        .send({
          status: "error",
          data: "Invalid or expired password reset token",
        });
    }

    // Find the user associated with the token
    const user = await Users.findById(resetTokenDoc.userId);
    if (!user) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    // Update the user's password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Delete the token
    await resetTokenDoc.delete();

    res.send({ status: "success", data: "Password reset successful" });
  } catch (error) {
    res.status(500).send({ status: "error", data: error.message });
  }
};
 
export {
  createUser,
  loginUser,
  updateUser,
  viewProfile,
  Deleted,
  forgotPassword,
  resetPassword,
};

import { Users } from "../models/users.models.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { PasswordResetToken } from "../models/passwordResetToken.js";
import sendEmail from "../utils/sendEmail.js";




const getAllProducts = async () => {
  const { userId } = req.params;
};

const getProductById = async () => {
  const { userId } = req.params;
};

const addProduct = async () => {
  const { userId } = req.params;
};

const updateProduct = async () => {
  const { userId } = req.params;
};

const deleteProduct = async () => {
  const { userId } = req.params;
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};

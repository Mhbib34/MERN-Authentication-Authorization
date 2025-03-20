import { ResponseError } from "../error/response-error.js";
import userModel from "../models/user-model.js";

export const getUserData = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) throw new ResponseError(404, "User is not found");
  return user;
};

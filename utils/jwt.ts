import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface IUserPayload {
  id: Types.ObjectId;
}

export const generateJWT = (payload: IUserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  return token;
};

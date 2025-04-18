import { Schema, model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  name_lastname: string;
  confirmed: boolean;
}

const UserSchema: Schema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  name_lastname: {
    type: String,
    required: true,
  },

  confirmed: {
    type: Boolean,
    default: false,
  },
});

const User = model<IUser>("User", UserSchema);

export default User;
import { Schema, model } from "mongoose";

interface IAdminCategory {
  name: string;
}

const AdminCategorySchema: Schema = new Schema<IAdminCategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const AdminCategory = model<IAdminCategory>(
  "AdminCategory",
  AdminCategorySchema
);
export default AdminCategory;
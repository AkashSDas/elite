import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

export default Category;

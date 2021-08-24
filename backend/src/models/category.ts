import { Document, model, Schema } from "mongoose";
import MongoPaging from "mongo-cursor-pagination";

export type CategoryDocument = Document & {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

const categorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 256,
      trim: true,
      unique: true,
    },
    description: { type: String, required: true, maxlength: 2048, trim: true },
  },
  { timestamps: true }
);

categorySchema.plugin(MongoPaging.mongoosePlugin, { name: "paginateCategory" });

const Category = model<CategoryDocument>("Category", categorySchema);
export default Category;

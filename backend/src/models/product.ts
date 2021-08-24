import { Document, model, Schema } from "mongoose";
import MongoPaging from "mongo-cursor-pagination";

export type ProductDocument = Document & {
  name: string;
  description: string;
  photo: any;
  category: any;
  stock: number;
  sold: number;
  price: number;
};

const productSchema = new Schema<ProductDocument>({
  name: { type: String, trim: true, required: true, maxlength: 32 },
  description: { type: String, trim: true, required: true, maxlength: 2048 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  sold: { type: Number, default: 0 },
  photoURL: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

productSchema.plugin(MongoPaging.mongoosePlugin, { name: "paginateProduct" });

const Product = model<ProductDocument>("Product", productSchema);
export default Product;

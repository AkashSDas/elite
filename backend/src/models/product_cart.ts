import { Document, Schema } from "mongoose";
import { ProductDocument } from "./product";

export type ProductCartDocument = Document & {
  name: string;
  count: number;
  price: number;
  product: ProductDocument;
  createdAt: Date;
  updatedAt: Date;
};

/// Currently the product cart schema is only used for shape of
/// individual product in products field in order schema and will be
/// useful when creating order document
export const productCartSchema = new Schema<ProductCartDocument>(
  {
    name: { type: String, trim: true, required: true },
    count: { type: Number, required: true },
    price: { type: Number, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true }
);

// export const ProductCart = model<ProductCartDocument>(
//   "ProductCart",
//   productCartSchema
// );

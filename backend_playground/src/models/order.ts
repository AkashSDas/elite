import { model, Schema } from "mongoose";

const ProductCartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const OrderSchema = new Schema(
  {
    products: [ProductCartSchema],
    transactionId: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Order = model("Order", OrderSchema);
export const ProductCart = model("ProductCart", ProductCartSchema);

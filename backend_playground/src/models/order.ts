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

enum OrderStatusEnum {
  "Cancelled",
  "Delivered",
  "Shipped",
  "Processing",
  "Received",
}

const OrderSchema = new Schema(
  {
    products: [ProductCartSchema],
    transactionId: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: OrderStatusEnum.Received,
      // enum: Object.values(OrderStatusEnum),
      enum: [
        OrderStatusEnum.Cancelled,
        OrderStatusEnum.Delivered,
        OrderStatusEnum.Processing,
        OrderStatusEnum.Received,
        OrderStatusEnum.Shipped,
      ],
    },
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

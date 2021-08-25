import { Document, model, Schema } from "mongoose";
import { ProductCartDocument, productCartSchema } from "./product_cart";
import { UserDocument } from "./user";

/// Product Cart model

enum OrderStatusEnum {
  "Cancelled",
  "Delivered",
  "Shipped",
  "Processing",
  "Received",
}

export type OrderDocument = Document & {
  products: ProductCartDocument[];
  transactionId: { [key: string]: any };
  amount: number;
  address: string;
  status: string;
  user: UserDocument;
  createdAt: Date;
  updatedAt: Date;
};

const orderSchema = new Schema<OrderDocument>(
  {
    products: { type: [productCartSchema], required: true },
    transactionId: {},
    amount: { type: Number, required: true },
    address: { type: String, trim: true, maxlength: 2048, required: true },
    status: {
      type: String,
      default: OrderStatusEnum.Received,
      enum: Object.values(OrderStatusEnum),
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Order = model<OrderDocument>("Order", orderSchema);

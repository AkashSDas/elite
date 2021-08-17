// import { ObjectId } from "bson";
import { Document, model, Schema } from "mongoose";

// Using ObjectId from bson package
// https://stackoverflow.com/questions/53974535/why-isnt-my-mongodb-objectid-recognised-as-a-type-in-typescript

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: any;
  stock: number;
  sold: number;
  photo: any;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2048,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export const Product = model("Product", ProductSchema);

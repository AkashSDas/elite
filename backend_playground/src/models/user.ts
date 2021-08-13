import crypto from "crypto";
import { Document, model, Schema } from "mongoose";

// import * as mongoose from "mongoose"

// Medium.com article for using TypeScript with Mongoose
// https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

// Few ways of creating models in mongoose using TypeScript
// https://stackoverflow.com/questions/34482136/mongoose-the-typescript-way
//
// Create methods in mongoose using TypeScript
// https://stackoverflow.com/questions/65667158/create-mongoose-schema-methods-using-typescript

// interface IUser {
//   username: string;
//   email: string;
//   userInfo?: string;
//   encryptPassword?: string;
//   salt?: string;
//   role: number;
//   purchases: any[];
// }

// This way is not recommended by mongoose
// Read the last part of `Creating Your First Document` in
// https://mongoosejs.com/docs/typescript.html
interface IUser extends Document {
  username: string;
  email: string;
  userInfo?: string;
  encryptPassword?: string;
  salt?: string;
  role: number;
  purchases: any[];
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    userInfo: {
      type: String,
      trim: true,
    },

    encryptPassword: {
      type: String,
      required: true,
    },

    salt: String,
    role: {
      type: Number, // The higher the number the more privileged the user is
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.method("securePassword", function (plainPassword: string): string {
  if (!plainPassword) return "";
  try {
    return crypto
      .createHmac("sha256", this.salt)
      .update(plainPassword)
      .digest("hex");
  } catch (err) {
    return "";
  }
});

// Below line will be give error, reason is not defined as per typescript
// userSchema.method = {
//   securePassword: function (plainPassword): string {
//     if (!plainPassword) return "";
//     try {
//       return crypto
//         .createHmac("sha256", this.salt)
//         .update(plainPassword)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },
// };

userSchema.method(
  "authenticate",
  function (this: any, plainPassword: string): boolean {
    return this.securePassword(plainPassword) === this.encryptPassword;
  }
);

userSchema
  .virtual("password")
  // using this with type as parameter of function to avoid error
  // https://stackoverflow.com/questions/41944650/this-implicitly-has-type-any-because-it-does-not-have-a-type-annotation
  .set(function (this: any, password: string): void {
    this._password = password;
    this.salt = crypto.randomUUID();
    this.encryptPassword = this.securePassword(password);
  })
  .get(function (this: any) {
    return this._password;
  });

// module.exports = model<IUser>("User", userSchema);
const User = model<IUser>("User", userSchema);
export default User;

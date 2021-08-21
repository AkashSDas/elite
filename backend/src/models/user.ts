import { Document, Schema } from "mongoose";
import crypto from "crypto";

type HashPasswordFunction = (password: string) => string;
type AuthenticateFunction = (password: string) => boolean;

export type UserDocument = Document & {
  username: string;
  email: string;
  address?: string;
  phoneNumber?: number;
  role: number;
  encryptPassword: string;
  salt: string;
  purchases: any[];

  hashPassword: HashPasswordFunction;
  authenticate: AuthenticateFunction;
};

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, maxlength: 32, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    address: { type: String, trim: true, maxlength: 2048 },
    phoneNumber: { type: Number },

    /// role 0 = normal user, by default all users are normal
    /// as number increases, privileges also increases
    role: { type: Number, default: 0 },

    encryptPassword: { type: String, required: true },
    salt: { type: String, required: true },

    /// by default user won't have anything purchased
    purchases: { type: Array, default: [] },
  },
  { timestamps: true }
);

/// Hashing user password before saving
/// Note .pre save can also be used where hashing the password will be a middleware
const hashPassword: HashPasswordFunction = function (
  this: UserDocument,
  password
) {
  /// if password length is not atleast 6 then returning empty str
  /// and as encryptPassword field is required, this empty str will
  /// cause error by mongoose
  if (password.length < 6) return "";

  try {
    return crypto
      .createHmac("sha256", this.salt)
      .update(password)
      .digest("hex");
  } catch (err) {
    return "";
  }
};

userSchema.methods.hashPassword = hashPassword;

/// Authenticate user with given and saved hash
// const

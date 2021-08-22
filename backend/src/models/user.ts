import { Document, model, Schema } from "mongoose";
import crypto from "crypto";

type HashPasswordFunction = (password: string) => string;
type AuthenticateFunction = (password: string) => boolean;

/// NOTE: You've to keep properties and methods in UserDocument type
/// and userSchema in sync, that one downside of using this approach
/// One package to look to avoid this is ts-mongoose, currently it also
/// has some downside, so that's why going with old i.e. this way
export type UserDocument = Document & {
  username: string;
  email: string;
  address?: string;
  phoneNumber?: number;
  role: number;
  purchases: any[];
  _password: string;
  encryptPassword: string;
  salt: string;
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
const authenticate: AuthenticateFunction = function (
  this: UserDocument,
  password
) {
  return this.hashPassword(password) === this.encryptPassword;
};

userSchema.methods.authenticate = authenticate;

/// Hashing password given user and also returning user password rather than hash
/// when asked for password using password as property
///
/// I'm not sure how to work with _password, should I include it in user
/// document or just case this as any and then set _password to it as
/// a virtual is a property that is not stored in MongoDB. Virtuals are typically
/// used for computed properties on documents.
/// But these won't be displayed on client side as we've not set virtual=true for any
/// option in userSchema
///
/// If you want the virtual field to be displayed on client side, then set
/// {virtuals: true} for toObject and toJSON in schema options
userSchema
  .virtual("password")
  .set(function (this: UserDocument, password: string): void {
    this._password = password;
    this.salt = crypto.randomUUID();
    this.encryptPassword = this.hashPassword(password);
  })
  .get(function (this: UserDocument) {
    return this._password;
  });

const User = model<UserDocument>("User", userSchema);
export default User;

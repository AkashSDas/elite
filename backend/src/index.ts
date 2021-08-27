// First loading env variables and then importing from other modules
import { config } from "dotenv";
import Stripe from "stripe";

// Load env variables
if (process.env.NODE_ENV !== "production") config();

import { connect } from "mongoose";
import { app } from "./api";

// Connect to MongoDB
connect(process.env.MONGODB_CONNECT_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) =>
    console.log(`Cannot connect to MongoDB Atlas\nError: ${err}`)
  );

/// Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2020-08-27",
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`API is available on http://localhost:${port}`)
);

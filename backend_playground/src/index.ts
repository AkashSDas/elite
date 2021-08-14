import { config } from "dotenv";
import { connect } from "mongoose";

import { app } from "./api";

// Environment Variables (Stripe API Key)
if (process.env.NODE_ENV !== "production") {
  config();
}

// Connecting to MongoDB
connect(process.env.MONGODB_CONNECT_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => console.log("Connect to MongoDB Atlas"));

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`API is available on http://localhost:${port}`)
);

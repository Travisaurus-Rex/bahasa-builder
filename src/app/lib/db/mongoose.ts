import mongoose from "mongoose";

let isConnected = false;
const URI = process.env.MONGODB_URI;

export async function connectDB() {
  if (isConnected) return;
  if (!URI) {
    throw new Error("Environment variable 'MONGODB_URI' is not defined.");
  }
  await mongoose.connect(URI);
  isConnected = true;
}

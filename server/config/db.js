
import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured in the environment");
  }

  try {
    const connection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(
      `MongoDB connected successfully: ${connection.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection failed.");
    console.error("Error name:", error.name);
    console.error("Error code:", error.code || "Not provided");
    console.error("Error message:", error.message);

    if (error.reason) {
      console.error("Server selection details:", error.reason);
    }

    throw error;
  }
}


import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not configured in the environment"
    );
  }

  try {
    console.log("Connecting to MongoDB Atlas...");

    const connection = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(
      `MongoDB connected successfully: ${connection.connection.host}`
    );

    return connection;
  } catch (error) {
    console.error("MongoDB connection failed.");
    console.error("Error name:", error.name || "Unknown");
    console.error("Error code:", error.code || "Not provided");
    console.error("Error message:", error.message || "No message available");

    // Log errors for individual MongoDB nodes.
    if (error.reason?.servers) {
      for (const [host, server] of error.reason.servers) {
        console.error(`MongoDB node: ${host}`);
        console.error(
          "Node error:",
          server.error?.message || "No additional details"
        );
      }
    }

    // Log the underlying cause if available.
    if (error.cause) {
      console.error(
        "Underlying cause:",
        error.cause.message || error.cause
      );
    }

    throw error;
  }
}

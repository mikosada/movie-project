import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URL);
    console.log("MongoDB Connected: ", conn.connection.host);
  } catch (error) {
    console.log("Error Connecting to MongoDB: " + error.message);

    process.exit(1); //1 means error, 0 means success
  }
};

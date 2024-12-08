import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("Mongo URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI.replace(/^"|"$/g, ""); // Remove quotes
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
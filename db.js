import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = "mongodb+srv://admin-amir:old_snake1993@amir.lnyzw.mongodb.net/todolist";

const connectDB = async () => {
  try {
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
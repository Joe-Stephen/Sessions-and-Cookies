import mongoose from "mongoose";

export const connectMongoDB = async () => {
  const uri = process.env.MONGO_URI;

  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB."))
    .catch((error) => {
      console.error("MongoDB connection error :", error);
    });
};

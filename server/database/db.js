
import mongoose from "mongoose";

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@blog-app.gehr1zg.mongodb.net/?appName=blog-app`;
  try {
    await mongoose.connect(URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error while connecting with the database", error);
  }
};

export default Connection;



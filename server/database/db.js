import mongoose from "mongoose";

const Connection = async (username, password) => {

    const URL = `mongodb+srv://${username}:${password}@blog-app.owwx6qp.mongodb.net/blogDB?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL);
        console.log("Database connected successfully");
        console.log("Connected DB:", mongoose.connection.name);
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

export default Connection;

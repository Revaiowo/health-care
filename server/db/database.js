import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectMongoose = ()=>{

    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database!")
}
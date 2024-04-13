import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const db_url = process.env.MONGODB_URI || "";
console.log(DB_NAME)

export const connectDB = async () => {
    try {
        await mongoose.connect(`${db_url}`).then((data) => {
            console.log(`Database connected with ${data.connection.host}`)
        });
    } catch (error) {
        console.log(error.message)
        setTimeout(connectDB, 5000)
    }
};
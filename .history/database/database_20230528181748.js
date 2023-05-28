import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const Connection = async () => {
    
    try {
        await mongoose.connect(process.env.DB_URI,{ useNewUrlParser:true})
        console.log("Db connected")
    } catch (error) {
        console.log("Error while connecting DB ",error);
    }
}

export default Connection;
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv"

import Router from "./routes/route.js";
import Connection from "./database/database.js";


dotenv.config()
const app = express();

app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use("/api/",Router)

app.listen(process.env.PORT,() => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
Connection();
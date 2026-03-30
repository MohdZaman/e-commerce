import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/Mongodb.js";
import connectCloudinary from "./config/Cloudinary.js";
import userRouter from "./routes/UserRoute.js";

// App Config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares

app.use(express.json());
app.use(cors());

// api end points
app.use("/api/user",userRouter)


app.get("/", (req,res)=>{
   res.send("Api Working")
})
app.listen(port,()=> console.log("server started on port :"+port))
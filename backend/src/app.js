import express from "express"
import cors from "cors";

const app = express();

app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    credentials: true,
  })); 
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes 

// import userRouter from "./routes/user.route";
import userRouter from "./routes/user.route.js"


app.use("/api/v1/user",userRouter);

export default app
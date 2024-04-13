import express from "express";
import { register } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middlewares.js"

const router = express.Router();


router.post("/register", upload.single("file"), register);

export default router;
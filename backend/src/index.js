import dotenv from "dotenv";
import {connectDB} from "./db/index.js";
import app from "./app.js";

dotenv.config();

connectDB().then(() => {
    app.on("error", (error) => {
        console.log(error.message);
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error.message);
});

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit"
import helmet from "helmet";
import fileUpload from "express-fileupload";
import router from "./routes/api.js";
import { DATABASE, MAX_JSON_SIZE, PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE } from "./app/config/config.js";


const app = express();

// App Use Middlewares
app.use(express.json({limit:MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE}));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(fileUpload());


// Rate Limiting
const limiter = rateLimit({windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
app.use(limiter);


// Web Cache
app.set('etag', WEB_CACHE);


// Connect to MongoDB
mongoose.connect(DATABASE, {autoIndex: true}).then(() => {
    console.log('MongoDB Connected...')
}).catch(() => {
    console.log('Failed to connect to MongoDB...')
});


// Routes
app.use('/api', router);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
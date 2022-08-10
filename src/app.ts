import express from "express";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import logger from "morgan";
import cors from "cors";
import healthAppRouter from './routes/healthApp.router';
import connectDB from './db_config/database';


require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200
}
app.use(logger("dev"));
app.use(express.json());
app.use(cors(corsOptions));

// ROUTES
app.use('/api', healthAppRouter)

const port = process.env.PORT || 3004;

// DATABASE CONNECT
const db_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.6gmnnge.mongodb.net/?retryWrites=true&w=majority`;
connectDB(db_url)


app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
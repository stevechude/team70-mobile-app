import express from "express";
import logger from "morgan";
import cors from "cors";
import healthAppRouter from './routes/healthApp.router';


require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

// ROUTES
app.use('/api', healthAppRouter)

const port = process.env.PORT || 3004;


app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
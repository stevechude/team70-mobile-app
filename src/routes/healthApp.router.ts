import express from "express";
import { registerUser } from "../controllers/healthApp.controller";

const router = express.Router();

router.post('/user/register', registerUser);

export default router;
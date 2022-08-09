import express from "express";
import { createEnairaWallet, registerUser, userSignin } from "../controllers/healthApp.controller";

const router = express.Router();

router.post('/user/register', registerUser);
router.post("/user/signin", userSignin);
router.post("/user/wallet", createEnairaWallet);

export default router;
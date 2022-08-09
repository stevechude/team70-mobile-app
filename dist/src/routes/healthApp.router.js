"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const healthApp_controller_1 = require("../controllers/healthApp.controller");
const router = express_1.default.Router();
router.post('/user/register', healthApp_controller_1.registerUser);
router.post("/user/signin", healthApp_controller_1.userSignin);
router.post("/user/wallet", healthApp_controller_1.createEnairaWallet);
exports.default = router;

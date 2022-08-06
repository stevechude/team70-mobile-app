"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const healthApp_router_1 = __importDefault(require("./routes/healthApp.router"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// ROUTES
app.use('/api', healthApp_router_1.default);
const port = process.env.PORT || 3004;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

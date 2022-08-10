"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const healthApp_router_1 = __importDefault(require("./routes/healthApp.router"));
const database_1 = __importDefault(require("./db_config/database"));
require("dotenv").config();
const app = (0, express_1.default)();
// const corsOptions = {
//   origin: "https://more-health-services.netlify.app/",
//   credentials: true,
//   optionSuccessStatus: 200,
// };
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// ROUTES
app.use('/api', healthApp_router_1.default);
const port = process.env.PORT || 3004;
// DATABASE CONNECT
const db_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.6gmnnge.mongodb.net/?retryWrites=true&w=majority`;
(0, database_1.default)(db_url);
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

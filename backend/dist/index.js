"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
//IMPORT ROUTES
const index_routes_1 = __importDefault(require("./routes/index.routes"));
// SETUP
const app = (0, express_1.default)();
//MIDDLEWARES
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//ROUTES
app.use("/api/v1/", index_routes_1.default);
//CATCH ERROR MIDDLEWARE
app.use((err, req, res, next) => {
    const message = err.message || "Internal Server Error";
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({ success: false, message });
});
// LISTEN
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`✓ Server is running on port ${port}`);
});

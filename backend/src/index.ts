import express, { NextFunction, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

//IMPORT ROUTES
import IndexRouter from "./routes/index.routes";
// SETUP
const app = express();

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());
//ROUTES
app.use("/api/v1/", IndexRouter);
//CATCH ERROR MIDDLEWARE
app.use((err: any, req: any, res: any, next: NextFunction) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ success: false, message });
});
// LISTEN
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`✓ Server is running on port ${port}`);
});

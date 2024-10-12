import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./utils/env.js";

import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import swaggerDocs from "./middlewares/swaggerDocs.js";
//import logger from "./middlewares/logger.js";

import contactsRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js";
import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = () => {
    const app = express();

    //app.use(logger);
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use(express.static("uploads"));

    app.use("/uploads", express.static(UPLOAD_DIR));
    app.use("/auth", authRouter);
    app.use("/contacts", contactsRouter);
    app.use("/api-docs", swaggerDocs());

    app.use(notFoundHandler);

    app.use(errorHandler);

    const port = Number(env("PORT", 3000));
    app.listen(port, () => console.log(`Server is running on port ${port}`));
};
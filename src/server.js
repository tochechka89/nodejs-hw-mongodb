import express from "express";
import cors from "cors";

import { env } from "./utils/env.js";

import notFoundHandleer from "./middlewares/notFoundHandler.js";
import errorHandleer from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";

import contactsRouter from "./routers/contacts.js";

export const setupServer = () => {
    const app = express();

    app.use(logger);
    app.use(cors());
    app.use(express.json());

    app.use("/contacts", contactsRouter);

    app.use(notFoundHandleer);

    app.use(errorHandleer);

    const port = Number(env("PORT", 3000));

    app.listen(port, () => console.log(`Server is running on port ${port}`));
};
import express from "express";
import session, {Store} from "express-session";
import {SESSION_OPTIONS} from "./config";
import {register} from "./routes";
import {internalServerError, notFound} from "./middleware/errors";

export const createApp = (store: Store) => {

    const app = express();

    app.use(express.json());

    app.use(session({
        ...SESSION_OPTIONS,
        store
    }))

    app.use(register);

    app.use(notFound);

    app.use(internalServerError);

    return app;
}

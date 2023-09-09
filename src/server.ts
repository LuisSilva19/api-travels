import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./database/connection";
import { logger } from "./configs/logger";
import router from "./routes";
import session from "express-session";
import { keycloak } from "./configs/keycloakService";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors());

  router(app);

  const memoryStore = new session.MemoryStore();

  app.use(
    session({
      secret: 'mySecret',
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    })
  );

  app.use( keycloak.middleware({
    logout: "/logout",
    admin: "/"
  }));

  const PORT = process.env.PORT || 9001;
  app.listen(PORT, async () => {
    logger.info(`🚀Server started Successfully ${PORT}`);
    connectDB();
  });

  app.get("/healthz",  (req, res) => {
    return res.json({ ok: true, environment: process.env.NODE_ENV });
  });

  app.get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
  });

  return app;
};

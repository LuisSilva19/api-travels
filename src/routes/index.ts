import express, { Application, Request, Response } from "express";
import noteRoutes from "./noteRoutes";
import tourRoutes from "./tourRoutes";
import travelsRoutes from "./travelRoutes";
import hotelRoutes from "./hotelRoutes";

const routes = (app: Application): void => {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({ titulo: 'rota inicial' });
    });

    app.get("/healthz", (req, res) => {
        return res.json({ ok: true, environment: process.env.NODE_ENV });
      });
    
    app.get("/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}` });
    });
  
    app.use(
      express.json(),
      noteRoutes,
      tourRoutes,
      travelsRoutes,
      hotelRoutes
    );
};

export default routes
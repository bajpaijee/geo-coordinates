// Defines an express app that runs the boilerplate codebase.

import bodyParser from "body-parser";
import express from "express";
import path from "path";
import compression from "compression";
import cors from "cors";
//Get Routes
import { getNearestStore as fetchNearestStore } from "./routes/store";

export default function createRouter() {
  const router = express.Router();
  router.use("/public", express.static(path.join(__dirname, "..", "public")));
  router.use(
    bodyParser.json({
      limit: "250mb"
    })
  );
  router.use(
    bodyParser.urlencoded({
      extended: false,
      limit: "250mb"
    })
  );
  router.use(
    cors({
      origin: "*"
    })
  );
  router.all("/*", (req, res, next) => {
    res.set({
      "Last-Modified": new Date().toUTCString(),
      Expires: -1,
      "Cache-Control": "must-revalidate, private"
    });
    next();
  });

  router.get("/getCoords", fetchNearestStore);

  router.all("/*", (req, res, next) => {
    next();
  });
  return router;
}

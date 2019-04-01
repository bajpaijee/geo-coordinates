import "babel-polyfill";
import express from "express";
import http from "http";
import { getEnv } from "./lib/env";
import createRouter from "./router";
import compression from "compression";
let server;
const app = express();
// compress all responses
app.use(compression());
const isProduction = getEnv("NODE_ENV") === "production";
const isStaging = getEnv("NODE_ENV") === "staging";

app.use(createRouter());
const port = 3000;
server = http.createServer(app);
server.listen(port);
server.on("listening", () =>
  console.log(
    `Listening on port ${server.address().port} in ${app.get("env")} mode !`
  )
);
server.timeout = 12000000;
process.on("uncaughtException", function(err) {
  console.log(err);
});
process.on("unhandledRejection", (reason, p) =>
  console.log("Unhandled Rejection at: Promise", p, reason)
);

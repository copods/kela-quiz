import * as fs from "node:fs";
import * as path from "node:path";
import * as url from "node:url";
import { PrismaClient } from "@prisma/client";
import { createRequestHandler } from "@remix-run/express";
import { broadcastDevReady, installGlobals } from "@remix-run/node";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import sourceMapSupport from "source-map-support";
installGlobals();
sourceMapSupport.install();
const prisma = new PrismaClient();
const debug = (...args) => console.log("[server]", ...args);
prisma.$connect().then(() => debug("Connected to database")).catch((error) => debug("Failed to connect to database:", error));
const BUILD_PATH = path.resolve("build/index.js");
const VERSION_PATH = path.resolve("build/version.txt");
let build = await reimportServer();
const chokidar = process.env.NODE_ENV === "development" ? await import("chokidar") : null;
const app = express();
app.use((req, res, next) => {
  res.set("x-fly-region", process.env.FLY_REGION ?? "unknown");
  res.set("Strict-Transport-Security", `max-age=${60 * 60 * 24 * 365 * 100}`);
  if (req.path.endsWith("/") && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    const safepath = req.path.slice(0, -1).replace(/\/+/g, "/");
    res.redirect(301, safepath + query);
    return;
  }
  next();
});
app.use(compression());
app.disable("x-powered-by");
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);
app.use(express.static("public", { maxAge: "1h" }));
app.use(morgan("tiny"));
app.all("*", (req, res, next) => {
  const handler = process.env.NODE_ENV === "development" ? createDevRequestHandler() : createRequestHandler({
    build,
    mode: process.env.NODE_ENV
  });
  handler(req, res, next).catch((error) => {
    next(error);
  });
});
const port = process.env.PORT || 3e3;
app.listen(port, async () => {
  console.log(`\u2705 app ready: http://localhost:${port}`);
  if (process.env.NODE_ENV === "development") {
    await broadcastDevReady(build);
  }
});
function createDevRequestHandler() {
  async function handleServerUpdate() {
    build = await reimportServer();
    if (build?.assets === void 0) {
      console.log(build.assets);
      debugger;
    }
    await broadcastDevReady(build);
  }
  chokidar?.watch(VERSION_PATH, { ignoreInitial: true }).on("add", handleServerUpdate).on("change", handleServerUpdate);
  return async (req, res, next) => {
    try {
      return createRequestHandler({
        build,
        mode: "development"
      })(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
async function reimportServer() {
  const stat = fs.statSync(BUILD_PATH);
  const BUILD_URL = url.pathToFileURL(BUILD_PATH).href;
  return import(BUILD_URL + "?t=" + stat.mtimeMs);
}

import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import Static_Route from "../routes/static.route";
import { CORS } from "../app.config";
import { Static_Config } from "../app.config";

export default async function (app) {
  // Cross-domain
  app.register(fastifyCors, CORS)
  // Static folder
  app.register(fastifyStatic, Static_Config)
  app.register(Static_Route)
}
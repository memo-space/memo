import fastify from 'fastify'
import { OPTION } from "./app.config";
import { RequestHandle, Serialization, ErrorHandle, LoogerHandle, sendHandle } from "./hooks/index";
import Router from "./routes/index";
import Plugins from "./plugins/index";

const app = fastify(OPTION)
// Register plugins
app.register(Plugins)

// Hooks registered
app.addHook('onRequest', RequestHandle)
app.addHook('preSerialization', Serialization)
app.addHook('onResponse', LoogerHandle)
app.addHook('onSend', sendHandle)

// Set default error return request body { ok.false }
app.setErrorHandler(ErrorHandle)
// Register route
app.register(Router)

export default app
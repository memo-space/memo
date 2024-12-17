import app from "./server/app";
import { LISTEN } from "./server/app.config";


async function start() {
  app.listen(LISTEN, (err) => {
    if (err) {
      console.error(err.message)
      return process.exit(0);
    }
    console.log(`[45m ʕ•̮͡•ʔ丿Service is running on port [41m ${LISTEN.port} [0m`);
  })
}

start()
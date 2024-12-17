import { join } from "node:path";

const LISTEN = {
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
}

const OPTION = {
  logger: process.env.NODE_ENV === 'development',
  bodyLimit: 5242880
}

const SECRET = process.env.SECRET || "memo"

// [`127.0.0.1:${LISTEN.port}`, `localhost:${LISTEN.port}`, 'rainto.top', 'www.rainto.top', 'api.rainto.top', 'vercel.com']
const WHITE_LIST = [];

const CORS = {
  origin: "*",
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

const SMTP = {
  smtp_url: process.env.SMTP_URL || "smtp.qq.com",
  smtp_port: process.env.SMTP_PORT || 465,
  smtp_psw: process.env.SMTP_PSW || ""
}

const Static_Config = {
  root: join(__dirname, './static'),
  prefix: '/public/',
  constraints: { host: 'rainto.top' }
}

const Image_Config = {
  quality: 100,
  exif: false
}

const COLOR = {
  GET: m => `[96m ${m} [0m`,
  POST: m => `[95m ${m} [0m`,
  PUT: m => `[94m ${m} [0m`,
  DELETE: m => `[91m ${m} [0m`,
  URL: m => `[93m ${m} [0m`
}


export {
  LISTEN, OPTION, SECRET, WHITE_LIST, CORS, SMTP, Static_Config, Image_Config, COLOR
}
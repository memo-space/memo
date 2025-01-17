import { BLACK_LIST, COLOR } from "../app.config";

export const RequestHandle = (req, res, done) => {
  if (BLACK_LIST.length > 0 && BLACK_LIST.includes(req.host)) {
    res.code(403).send({ ok: false, code: 403, error: 'Forbidden', message: 'Your domain is on the blacklist.' })
  }
  return done()
}

export const Serialization = (req, res, data, done) => {
  const type = typeof data
  const code = res.statusCode
  if (code >= 200 && code < 300) {
    if (type === 'object' && !Array.isArray(data)) {
      data.ok = true
    } else if (type === 'string' || Array.isArray(data)) {
      data = Object.assign({ ok: true }, { message: data })
    }
  }
  done(null, data)
}

export const ErrorHandle = (error, req, res) => {
  const code = error.statusCode || res.statusCode || 500
  res.statusCode = code
  res.send({
    ok: false,
    message: error.message,
    statusCode: code
  });
}

export const LoogerHandle = (req, res) => {
  const method = req.method
  const time = res.elapsedTime.toFixed(2)
  console.log(
    COLOR[method](method),
    COLOR.URL(req.url),
    `${time} ms`
  )
}

export const sendHandle = (req, res, payload, done) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.header('Access-Control-Allow-Methods', '*')
  done()
}

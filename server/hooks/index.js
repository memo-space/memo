import { WHITE_LIST, COLOR } from "../app.config";

export const RequestHandle = (req, res, done) => {
  res.header('Access-Control-Allow-Origin','*')
  const host = req.headers.host

  if (WHITE_LIST.length > 0 && !WHITE_LIST.includes(host)) {
    res.status(403).send({ ok: false, error: 'Forbidden', message: 'Your domain is not allowed to access this resource.' })
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
      data = Object.assign({ ok: true }, { message:data })
    }
  }
  done(null, data)
}

export const ErrorHandle = (error, req, res) => {
  const code = error.statusCode || 500
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


export default (opt) => {

  opt.method = opt.method || 'GET'
  const requestOptions = {
    method: opt.method,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: opt.method === 'GET' ? undefined : JSON.stringify(opt.data)
  }
  return fetch(opt.url, requestOptions).then((r) => r.json())
}
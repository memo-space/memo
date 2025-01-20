const $ = param => document.getElementById(param),
  cr = param => { return document.createElement(param) },
  token = () => { return localStorage.getItem('token') },
  ap = (mum, son) => mum.appendChild(son),
  val = param => $(param).value,
  feh = async (method, url, body) => {
    let token = ''
    if (body) token = body.token
    let headers = { "Content-Type": "application/json" }
    const auth = { "Authorization": token }
    token ? headers = Object.assign(headers, auth) : headers
    const param = {
      method, headers
    }
    body ? Object.assign(param, { body: JSON.stringify(body) }) : null
    const result = await fetch("/" + url, param).then((e => e.json()))
    console.log(result);
    const { ok, message } = result
    ok ? msg.sc(message || 'Get data success.') : msg.er(result.message || 'Get data failed.')
    return result
  },
  msg = {
    sc: e => MSG("suc", "🥳 " + e),
    er: e => MSG("err", "😢 " + e)
  }

function MSG(e, t) {
  let box = $('msg')
  if (!box) box = cr('div'), box.id = 'msg', ap(document.body, box)
  const item = cr('div')
  item.className = `msg ${e}`, item.textContent = t
  ap(box, item)
  setTimeout(() => {
    item.style.opacity = 0
    setTimeout(() => {
      item.remove(item)
    }, 500)
  }, 2000)
}

window.addEventListener('DOMContentLoaded', function () {
  const tk = token()
  if (!tk) {
    const rule = ['/', "/login.html", "/init.html"]
    const auth = rule.includes(window.location.pathname)
    if (!auth) {
      localStorage.removeItem('token')
      window.location.href = "/login.html"
    }
    const menu = document.querySelectorAll('a')
    for (const link of menu) {
      const { pathname } = new URL(link.href)
      if (!tk && !rule.includes(pathname)) {
        link.onclick = function (e) {
          e.preventDefault()
          msg.er("Please login first.")
        }

      }
    }
  }

})
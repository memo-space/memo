class MemoTalk {
  constructor(opt) {
    opt = opt || {}
    const deftConfig = {
      el: "MemoTalk",
      url: "/",
      path: location.pathname,
      visits: true,
      load: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="30px" fill="#333"><rect x="0" y="0" width="4" height="15"><animate attributeName="opacity" values="1;.2;1" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="10" y="0" width="4" height="15"><animate attributeName="opacity" values="1;.2;1" begin="0.2s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="20" y="0" width="4" height="15"><animate attributeName="opacity" values="1;.2;1" begin="0.4s" dur="0.6s" repeatCount="indefinite"></animate></rect></svg>'
    }
    this.opt = Object.assign(deftConfig, opt)
    this.el = document.querySelector(opt.el)
    this.page = 0
    this.Init()
  }
  $(e) { return this.el.querySelector(e) }
  val(dom) { return this.el.querySelector(dom).value }
  ap(mum, son) { mum.appendChild(son) }
  cr(dom) { return document.createElement(dom) }

  async feh(method, url, body) {
    let headers = { "Content-Type": "application/json" }
    const param = { method, headers }
    body ? Object.assign(param, { body: JSON.stringify(body) }) : null
    const result = await fetch(this.opt.url + url, param).then((e => e.json()))
    console.log(result);
    return result
  }

  post() {
    const btn = this.$('#m-sub')
    const warn = this.$('#m-warn').innerHTML

    btn.onclick = async (e) => {
      const name = this.val('#m-name'),
        email = this.val('#m-email'),
        body = this.val('#m-edit')
      const params = {
        path: this.opt.path, name, email, body
      }
      const data = await this.feh('POST', 'comment', params)
    }
  }

  wrap() {
    return `
    <div id="щ" class="m-wrap">
      <div class="m-meta">
        <div class="m-count"><span id="m-num">15</span>评论</div>
      </div>
      <div class="m-comment">
        <div id="m-warn"></div>
        <div class="m-panel">
          <textarea placeholder="随便讲啲嘢啦～" id="m-edit" rows="4"></textarea>
          <div class="m-foot">
            <input id="m-name" placeholder="name *" type="text" value="rainto">
            <input id="m-email" placeholder="@email" type="email" value="rainto0322@foxmail.com">
            <button id="m-sub">发送</button>
          </div>
        </div>
      </div>

      <div id="m-list"></div>
    </div>
    `
  }

  async getList() {
    const list = this.$('#m-list')
    const data = await this.feh('GET', `comment/${this.page}/5?p=${this.opt.path}`)
    

  }

  Init() {
    this.el.innerHTML = this.wrap()
    this.post()
    this.getList(this.page)
  }
}
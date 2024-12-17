"use strict";
class MemoTalk {
  constructor(options) {
    this.title = "评论" || options.title
    this.el = document.querySelector(options.el)
    this.path = options.path || location.pathname
    this.url = options.url || ""
    this.viwState = options.view || false
    this.init()
  }
  $(e) { return this.el.getElementById(e) }
  val(dom) { return this.el.querySelector(dom).value }
  ap(mum, son) { mum.appendChild(son) }

  async post(body) {
    const result = await fetch('http://localhost:4000/comment', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    const data = await result.json()
    console.log(data)
    return data
  }

  talkCont() {
    return `
      <div class="talk-cont">
        <textarea required id="talk-body" rows="3">逆势大厦比</textarea>
        <button id="talk-reply">提交</button>
      </div>`
  }

  cont() {
    return `
    <div id="MemoTalk">
      <div id="talk-list"></div>
      <div id="talk-meta">
        <input required id="talk-name" type="text" placeholder="name" value="Rainto">
        <input required id="talk-email" type="email" placeholder="email" value="rainto0322@foxmail.com">
      </div>
      ${this.talkCont()}
    </div>`
  }

  init() {
    const main = `
    <h2>${this.title}</h2>
    <div id="talk-list"></div> ${this.cont()}`
    this.el.innerHTML = main
    const btn = $('talk-reply')
    btn.onclick = async () => {
      const name = this.val('#talk-name'),
        email = this.val('#talk-email'), body = this.val('#talk-body')
      const content = {
        date: (new Date()).getTime(),
        path: this.path,
        name,email,body
      }
      console.log(content);
      
      const data = await this.post(content)

    }
  }
}
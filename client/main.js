import { mount } from 'svelte'
import './assets/main.css'
import { options } from './lib/stores'

// @ts-ignore
import App from './App.svelte'

function Init(opt) {
  opt = opt || {}
  const DefaultOptions = {
    url:'/',
    el: "memo-talk",
    path: location.pathname,
    vist: true
  }
  options.set(Object.assign(DefaultOptions, opt))
  mount(App, { target: document.getElementById(opt.el) })
}

// @ts-ignore
export default window.MemoTalk = {
  Init
}
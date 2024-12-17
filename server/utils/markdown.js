import { marked } from "marked";

marked.use({ mangle: false, headerIds: false, });

/**
 * Convert markdown to HTML.
 * @param {string} body 
 * @returns {html:string}
 */
export function conver_body(body) {
  return marked.parse(body)
}

/**
 * Delete excess markdown.
 * @param {string} body 
 * @returns {html:string}
 */
export function conver_list(datas) {
  for (let i = 0; i < datas.length; i++) {
    const ele = datas[i];
    delete ele.body
  }
}

// padStart 如果长度达不到指定长度(2)使用指定字符(0)填充到内容前面(padEnd填充到后面)
// 日期格式化
export function Format(t) {
  const i = new Date(t)
  const ps = (p) => { return String(p).padStart(2, "0") }
  const [e, n, a, s, d] = [i.getFullYear(), ps(i.getMonth() + 1), ps(i.getDate()), ps(i.getHours()), ps(i.getMinutes())];
  return `${e}-${n}-${a} ${s}:${d}`
}


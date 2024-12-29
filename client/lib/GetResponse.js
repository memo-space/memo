// @ts-ignore
export const Get = async (path) => {
  const result = await fetch(path)
  const data = await result.json()
  console.log(data);
  return data
}

export const Post = async (path, body) => {
  const result = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(body)
  })
  const data = await result.json()
  return data
}
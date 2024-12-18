export const Post_Comment_Schema = {
  description: 'Post Comment',
  body: {
    type: 'object',
    properties: {
      date: { type: 'string', default: (new Date()).getTime() },
      path: { type: 'string' },
      name: { type: 'string' },
      email: { type: 'string' },
      body: { type: 'string' },
      pid: { type: 'string', default: '' },
      rid: { type: 'string', default: '' }
    },
    required: ['path', 'name', 'email', 'body']
  }
}
export const GET_Comment_List_Schema = {
  description: 'Get Comment List',
  params: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      size: { type: 'number', maximum: 10 }
    },
  }
}
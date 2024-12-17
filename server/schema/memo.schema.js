export const Memo_Schema = {
  description: 'Memo Schema',
  body: {
    type: 'object',
    properties: {
      date: { type: 'string', default: Date.now() },
      body: { type: 'string', maxLength: 1000 }
    },
    required: ['body']
  }
}

export const Memo_ID = {
  description: 'Get Memo By Id',
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
  }
}

export const Memo_List = {
  description: 'Get Memo List',
  params: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      size: { type: 'number', maximum: 50 }
    },
  }
}

export const Memo_Update = {
  description: 'Update Memo By ID',
  params: Memo_ID.params,
  body: Memo_Schema.body
}
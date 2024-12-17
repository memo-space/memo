import { Memo_List } from "./memo.schema";

export const Image_Name = {
  description: 'Get Image By Name',
  params: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    },
  }
}

export const Image_List = {
  description: 'Get Image List',
  params: Memo_List.params
}

export const Post_Image = {
  description: 'Upload Image By',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      base64: { type: 'string' }
    },
  }
}


export const Image_Id = {
  description: 'Delete Image By ID',
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
  }
}
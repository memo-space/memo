import { Get_Comment_count, Post_Comment, Get_Comment_List } from "../control/comment.control";
import { Post_Comment_Schema, GET_Comment_List_Schema } from "../schema/comment.schema";
export default function (app) {
  app.get('/', Get_Comment_count)

  app.get('/:page/:size', Get_Comment_List)
  
  app.post('/', {
    schema: Post_Comment_Schema
  }, Post_Comment)

}
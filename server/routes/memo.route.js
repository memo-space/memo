import { Memo_Schema, Memo_ID, Memo_List, Memo_Update } from "../schema/memo.schema";
import { Get_Memo, Get_Memo_List, Post_Memo, Update_Memo, Delete_Memo } from "../control/memo.control";
import { Permission } from "../utils/authorization";

// prefix: '/memo'
export default function (app) {

  app.get('/:id', {
    schema: Memo_ID
  }, Get_Memo)

  app.get('/:page/:size', {
    schema: Memo_List
  }, Get_Memo_List)

  app.post('/', {
    schema: Memo_Schema,
    preValidation: Permission
  }, Post_Memo)

  app.put('/:id', {
    schema: Memo_Update,
    preValidation: Permission
  }, Update_Memo)

  app.delete('/:id', {
    schema: Memo_ID,
    preValidation: Permission
  }, Delete_Memo)
}
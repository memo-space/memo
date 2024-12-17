import { Image_Name, Image_List, Image_Id } from "../schema/album.schema";
import { Get_Image, Upload_Image, Get_Image_list, Delete_Image } from "../control/album.control";
import { Permission } from "../utils/authorization";
// prefix: '/img'
export default function (app) {
  app.get('/:name', {
    schema: Image_Name
  }, Get_Image)

  app.get('/li/:page/:size', {
    schema: Image_List
  }, Get_Image_list)

  app.post('/', {
    schema: Image_Name,
    preValidation: Permission
  }, Upload_Image)

  app.delete('/:id', {
    schema: Image_Id,
    preValidation: Permission
  }, Delete_Image)

}
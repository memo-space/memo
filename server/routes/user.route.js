import { Signup_Schema, Login_Schema } from "../schema/user.schema";
import { Signup_Control, Login_Control } from "../control/user.control";


export default function (app) {

  app.post('/signup', {
    schema: Signup_Schema
  }, Signup_Control)

  app.post('/login', {
    schema: Login_Schema
  }, Login_Control)

}
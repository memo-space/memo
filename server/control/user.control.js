import { User } from "../model";
import bcrypt from "bcrypt";
import { Convert_Token, Verify_Token } from "../utils/authorization";


export const Signup_Control = async (req, res) => {
  const { name, password, email } = req.body
  const empty = await User.findOne({ group: "owner" })
  const user = {
    name,
    password: bcrypt.hashSync(password, 8),
    email,
    group: 'tourist'
  }

  if (empty === null) user.group = "owner"

  const data = await new User(user).save()
  if (data) return {
    user: data,
    message: `${user.group} "${user.name}" registration successful.`
  }

}

export const Login_Control = async (req, res) => {
  const { name, password } = req.body
  const token = req.headers.authorization
  if (token) {
    const data = await Verify_Token(token, res)
    if (data) {
      data.message = "Token login successful."
      return data
    }

  } else if (name && password) {
    let user = await User.findOne({ name })
    if (!user) return new Error("Not found this user.")
    const sure = bcrypt.compareSync(password, user.password)
    if (!sure) return new Error("The password is incorrect.")
    const token = Convert_Token(name, user._id)

    return { user, token, message: `${user.group} ${user.name} login successful.` }
  }
}
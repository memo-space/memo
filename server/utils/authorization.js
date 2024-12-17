import { SECRET } from "../app.config";
import { User } from "../model";
import jwt from "jsonwebtoken";

export const Convert_Token = (name, payload) => {
  return name + "=" + jwt.sign({ id: payload.toString() }, SECRET, { expiresIn: '7d' })
}

export async function Verify_Token(param, res) {
  const noLegal = () => {

    res.statusCode = 401
    res.send({
      ok: false,
      message: "Token not legal.",
      statusCode: 401
    })
  }
  if (!param) noLegal()
  try {
    var arr = param.split("=")
    var name = arr[0], token = arr[1]
  } catch (error) {
    noLegal()
  }

  const user = await User.findOne({ name })
  console.log(param);
  
  if (!user) throw new Error("Token not legal.")
  const data = await jwt.verify(token, SECRET, (err, decoded) => {
    if (err) noLegal()
    return decoded
  })

  if (data.id) {
    const condition = data.id === user._id.toString()
    if (!condition) throw new Error('Token invalid')
  }
  return { user, token: await Convert_Token(name, user._id) }

}

export async function Permission(req, res) {
  const token = req.headers.authorization
  const data = await Verify_Token(token, res)
  if (data.user.group !== "owner") {
    throw new Error("You are not an administrator.")
  }
}
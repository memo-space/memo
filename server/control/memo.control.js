import { Memos } from "../model";
import { conver_body, conver_list } from "../utils/markdown";

export const Get_Memo = async (req, res) => {
  const { id } = req.params
  const data = await Memos.findById(id)
  return { data }
}

export const Get_Memo_List = async (req, res) => {
  const { page, size } = req.params

  const data = await Memos.find()
    .sort({ date: -1 })
    .skip((page) * size)
    .limit(size).lean()

  if (data.length <= 0) return new Error("Not found moment.")
  const count = await Memos.countDocuments()
  const max = Math.ceil(count / size)
  await conver_list(data)
  return { data, count, max }
}

export const Post_Memo = async (req, res) => {
  const { date, body } = req.body
  const data = await new Memos({
    date, body, html: conver_body(body)
  }).save()
  return { data, message: "Post memo successful." }
}

export const Update_Memo = async (req, res) => {
  const { id } = req.params
  const { body } = req.body
  req.body.html = conver_body(body)
  const data = await Memos.findByIdAndUpdate(id, req.body, { new: true })
  return { data, message: "Memo update successful" }
}

export const Delete_Memo = async (req, res) => {
  const { id } = req.params
  const data = await Memos.findByIdAndDelete(id)
  if (data === null) return new Error("Not found this memo.")
  return { message: "Memo deletion successful." }
}
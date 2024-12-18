import { Comment, Memos } from "../model";
export const Get_Comment_count = async (req, res) => {

}

export const Post_Comment = async (req, res) => {
  const data = await new Comment(req.body).save()
  return { data, message: "Comment sent successfully." }
}

export const Get_Comment_List = async (req, res) => {
  const { page, size } = req.params
  const { p } = req.query

  const data = await Comment.find({
    path: p,
    pid: '',
    rid: ''
  }).sort({ _id: -1 })
    .skip((page) * size)
    .limit(size).lean()


  return { data }
}
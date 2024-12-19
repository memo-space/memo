import { Comment, Memos } from "../model";
function DeepClone(options = {}) {
  const str = JSON.stringify(options)
  const json = JSON.parse(str)
  return json
}

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

  const processedData = await Promise.all(data.map(async ele => {
    const reply = await Comment.find({ pid: ele._id }).sort({ _id: 1 })
    for (const item of reply) {
      delete item.path
    }
    const repliesWithRename = await Promise.all(reply.map(async i => {
      if (i.rid) {
        const content = await Comment.findOne({ _id: i.rid }).lean()
        const { _id, date, path, name, email, body, pid, rid } = i
        return {
          _id, date, path, name, email, body, pid, rid,
          at: content ? content.name : null
        }
      }
      return i
    }))
    return { ...ele, reply: repliesWithRename }
  }))

  return { data: processedData }
}
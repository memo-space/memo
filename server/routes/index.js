import User_Route from "./user.route";
import Memo_Route from "./memo.route";
import Album_Route from "./album.route";
import Comment_Route from "./comment.route.js";

export default function (app) {
  app.register(User_Route)
  app.register(Memo_Route, { prefix: 'memo' })
  app.register(Album_Route,{ prefix: 'img' })
  app.register(Comment_Route,{ prefix: 'comment' })

} 
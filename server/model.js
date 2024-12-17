import { Schema, mongoose } from "mongoose";
const {
  DB_URL,
  DB_URL2,
  DB_NAME,
  MEMO_USER = 'm_user',
  MEMO_CONFIG = 'm_config',
  MEMO_ALBUM = 'm_album',
  MEMO_MOMENT = 'm_memo',
  MEMO_COMMENT = 'm_comment'
} = process.env

const dbName = DB_NAME || "memo"
const Memo = mongoose.createConnection(DB_URL, { dbName })
const Images = mongoose.createConnection(DB_URL2 || DB_URL, { dbName })

const option = {
  versionKey: false,
  virtuals: false,
  timestamps: false
}
const User = Memo.model(MEMO_USER, new Schema({
  name: { type: String, unique: true, trim: true },
  password: { type: String, trim: true },
  group: { type: String, default: ["tourist", "owner"] },
  email: { type: String, unique: true }
}, option))

const Config = Memo.model(MEMO_CONFIG, new Schema({
  name: { type: String, unique: true, trim: true },
  config: { type: Object }
},));

const Memos = Memo.model(MEMO_MOMENT, new Schema({
  date: { type: Date },
  body: { type: String },
  html: { type: String }
}, option));

const Comment = Memo.model(MEMO_COMMENT, new Schema({
  date: { type: Number, default: () => { return (new Date()).getTime() } },
  path: { type: String },
  name: { type: String },
  email: { type: String },
  body: { type: String },
  pid: { type: String },
  rid: { type: String }
}, option));

const Album = Images.model(MEMO_ALBUM, new Schema({
  name: {
    type: String, trim: true, default: () => {
      let e = new Date,
        t = e.getFullYear().toString(),
        a = e.getMonth() + 1
      a < 10 && (a = "0" + a)
      let n = e.getDate()
      return n < 10 && (n = "0" + n), t + a + n
    }
  },
  base64: { type: String, trim: true },
}, option))

export {
  User, Config, Memos, Album, Comment
}
import { Album } from "../model";
import { conver_image_list } from "../utils/image";

export const Get_Image = async (req, res) => {
  const { name } = req.params
  const img = await Album.findOne({ name: decodeURIComponent(name) })
  let BUFFER = ''
  res.header('Content-Type', "image/png;charset=utf-8")
  img ? BUFFER = Buffer.from(img.base64, 'base64') : BUFFER = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4", 'base64')
  return BUFFER
}

export const Upload_Image = async (req, res) => {
  const { name, base64 } = req.body
  const same = await Album.findOne({ name })
  if (same) return new Error("An image with the same name exist.")
  try {
    await new Album({
      name,
      base64: base64.replace(/^data:image\/\w+;base64,/, "")
    }).save()
    return { name, message: `Image ${name} upload successful.` }
  } catch (error) {
    return new Error("Image upload failed.");
  }
}

export const Get_Image_list = async (req, res) => {
  const { page, size } = req.params
  const data = await Album.find()
    .sort({ _id: -1 })
    .skip((page) * size)
    .limit(size).lean()

  if (data.length <= 0) return new Error("Not found image.")
  const count = await Album.countDocuments()
  const max = Math.ceil(count / size)
  await conver_image_list(data)
  return { data, count, max }
}

export const Delete_Image = async (req, res) => {
  const { id } = req.params
  const data = await Album.findByIdAndDelete(id)
  if (data === null) return new Error("Not found this image.")
  return { message: "Image deletion successful." }
}
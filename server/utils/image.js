import sharp from "sharp";
import { Image_Config } from "../app.config";
export async function Conver_Webp (base64Image) {
  try {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const imageData = Buffer.from(base64Data, 'base64');
    const webpBuffer = await sharp(imageData)
      .toFormat('webp', Image_Config)
      .toBuffer();
    return webpBuffer;
  } catch (error) {
    throw Error('Image format conversion to webp failed.')
  }
}
export function conver_image_list(datas) {
  for (let i = 0; i < datas.length; i++) {
    const ele = datas[i];
    delete ele.base64
  }
}

/**
 * Delete excess markdown.
 * @param {string} body 
 * @returns {html:string}
 */
export function conver_list(datas) {
  for (let i = 0; i < datas.length; i++) {
    const ele = datas[i];
    delete ele.body
  }
}

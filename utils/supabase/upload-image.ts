import { v4 as uuid } from 'uuid'
import { createClient } from './serverClient'

export const uploadImage = async (image: File): Promise<string> => {
    console.log("here we are")
  const supabase = await createClient();
  const imageName: string[] = image.name.split(".")
  const cleanImage = imageName[0].replace(/\s[^\w]/g, '')

  const uniqueImagePath: string = `${cleanImage}-${uuid()}.${imageName[1]}`
  const { data, error } = await supabase.storage.from("postimages").upload(uniqueImagePath, image)

  if (error) throw error

  const { data: { publicUrl } } = await supabase.storage.from('postimages')
    .getPublicUrl(data.path)

    return publicUrl
}
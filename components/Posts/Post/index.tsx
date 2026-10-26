import { HomePostType } from "@/utils/supabase/queries";
import Link from "next/link";

type ArrayElement<T> = T extends (infer U)[] ? U : never
type PostPropsType = ArrayElement<HomePostType>;

const Post = ({ id, title, author, slug, image }: PostPropsType) => {
  return (
    <>
      <Link key={id} href={`/${slug}`}>
        <div className="w-full aspect-square flex align-center justify-center overflow-hidden">{image && <img className=" w-full h-full object-cover" src={image} alt={title} />}</div>
        <h2 className="text-2xl my-2 p-2">{title}</h2>
      </Link>
      <p className="text-right my-2 p-2"><Link href={`/profile/${author?.id}`}> Posted by {author?.username}</Link></p>
    </>
  )
}

export default Post
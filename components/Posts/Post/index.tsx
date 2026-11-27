import { HomePostType } from "@/lib/supabase/queries";
import Link from "next/link";

type ArrayElement<T> = T extends (infer U)[] ? U : never
type PostPropsType = ArrayElement<HomePostType>;

const Post = ({ id, title, slug, image, }: PostPropsType) => {
  return (
    <div key={id} className=" basis-full md:basis-[calc(50%-16px)] flex flex-col border overflow-hidden">
      <Link href={`/${id}-${slug}`}>
        <div className="w-full  align-center justify-center ">
          <img className=" w-full aspect-2/3 object-cover" src={image ? image : '/cropped-tie-in.gif'} alt={title} />
        </div>
      </Link>
    </div>
  )
}

export default Post
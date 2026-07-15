import { getHomePosts, HomePostType } from "@/utils/supabase/queries";
import Link from "next/link";

export default async function Home() {
  const { data, error } = await getHomePosts();

  return (
    <>
      <div className="min-h-screen font-sans">
        <main className="flex flex-co py-4 px-4 md:px-16 sm:items-start">
          <div className="w-full flex flex-wrap gap-8">
            {data && data.map(({ id, title, author, slug, image }) =>
              <Link className="basis-[calc(100%/2-32px/2)] md:basis-[calc(100%/3-32px*2/3)] flex flex-col border-1 rounded-xl" key={id} href={`/${slug}`}>
                <div className="w-full aspect-square flex align-center justify-center overflow-hidden">{image && <img className=" w-full h-full object-contain" src={image} alt={title} />}</div>
                <h2 className="text-2xl my-2 p-2">{title}</h2>
                <p className="text-right my-2 p-2">Posted by {author.username}</p>
              </Link>)}
          </div>
        </main>
      </div>
    </>
  );
}
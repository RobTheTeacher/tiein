import { getHomePosts, HomePostType } from "@/utils/supabase/queries";
import Link from "next/link";

export default async function Home() {
  const { data, error } = await getHomePosts();

  return (
    <>
      <div className="min-h-screen font-sans">
        <main className="flex  flex-co py-4 px-16 sm:items-start">
          <div className="w-full flex flex-wrap gap-8">
            {data && data.map(({ id, title, author, slug, image }) =>
              <Link className="basis-1/3"key={id} href={`/${slug}`}>
                {image && <img className="w-auto h-full object-cover" src={image} alt={title} />}
                <h2 className="text-2xl my-2">{title}</h2>
                <p className="text-right my-2">Posted by {author.username}</p>
              </Link>)}
          </div>
        </main>
      </div>
    </>
  );
}
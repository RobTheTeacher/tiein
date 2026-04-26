import { getHomePosts, HomePostType } from "@/utils/supabase/queries";
import Image from "next/image";

export default async function Home() {
  const {data, error} = await getHomePosts();
  console.log(data?.length, "length")
  return (
    <>
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex  w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {data && data.map(({id, title, author, created_at}) => <div key={id}><h2>{title}</h2><p>Posted by {author.name} on {created_at}</p></div>)}
      </main>
    </div>
    </>
  );
}

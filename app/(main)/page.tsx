import { getHomePosts, HomePostType } from "@/utils/supabase/queries";

export default async function Home() {
  const {data, error} = await getHomePosts();
  
  return (
    <>
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex  w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        {data && data.map(({id, title, author, created_at}) => <div key={id}><h2>{title}</h2><p>Posted by {author.username} on {created_at}</p></div>)}
      </main>
    </div>
    </>
  );
}
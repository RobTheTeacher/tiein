import HomePosts from "@/components/Posts/home-posts";

export default async function Home() {
  return (
    <>
      <div className="min-h-screen font-sans">
        <HomePosts />
      </div>
    </>
  );
}
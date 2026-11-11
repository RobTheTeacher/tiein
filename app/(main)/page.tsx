import Posts from "@/components/Posts";

export default async function Home() {
  return (
    <>
      <div className="min-h-screen font-sans">
        <Posts />
      </div>
    </>
  );
}
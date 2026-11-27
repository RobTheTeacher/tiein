import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative md:p-8">
      <div className="absolute top-25 bottom-0 left-0 right-0 w-full bg-[url(/backgrounds/home-bg-gap.png),url(/backgrounds/home-bg2-gap.png)] bg-size-[50%,50%] bg-[position:left_top,right_top] bg-repeat-y"></div>
      <Header children={children} />
    </div>
  );
}
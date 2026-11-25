import EventHeader from "@/components/EventHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <EventHeader children={children} />
    </>
  );
}
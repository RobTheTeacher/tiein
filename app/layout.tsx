import type { Metadata } from "next";
import "./globals.css";
import {
  QueryClientProvider,
} from '@/providers/query-client-providers'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Tie In",
  description: "A social media alternative to find events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="relative max-w-360 m-auto">
        <QueryClientProvider>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";

import { Finger_Paint } from "next/font/google";
import "./globals.css"
import {
  QueryClientProvider,
} from '@/providers/query-client-providers'
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const fingerPaint = Finger_Paint({
    subsets: ['latin'],
    weight: "400",
    variable: "--font-fingerpaint"
  });

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
    <html lang="en" className={cn("font-sans", inter.variable, fingerPaint.variable)}>
      <body className="relative md:p-8">
        <QueryClientProvider>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
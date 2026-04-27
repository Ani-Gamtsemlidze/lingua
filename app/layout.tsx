import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/components/sessionProvider";

export const metadata: Metadata = {
  icons: {
    icon:"/favicon.svg",
  },
  title: "Lingua - Read, Save, Remember",
  description: "A language learning companion that helps you save and remember words as you read.",
};

const dmSans = DM_Sans({
subsets: ["latin"],
weight: "800",
variable: "--font-dm-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased ${dmSans.variable} font-sans bg-background text-foreground`}
      >
        <main className="flex-1  bg-gray-50">
          <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  );
}

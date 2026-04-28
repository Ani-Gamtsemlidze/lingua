import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { DM_Sans } from "next/font/google";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-sans",
});

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-screen overflow-hidden ${dmSans.variable} font-sans`}
    >
      <Sidebar />
      <div className="flex flex-col flex-1">
        {/* <Header /> */}
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Toaster
          position="top-center" richColors 
        />
      </div>
    </div>
  );
}

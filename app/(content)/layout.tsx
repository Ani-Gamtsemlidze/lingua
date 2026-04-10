import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="">{children}</main>
      </div>
    </div>
  );
}
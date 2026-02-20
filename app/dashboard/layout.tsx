import Navbar from "../components/navbar/Navbar";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen max-h-screen w-full lg:max-w-[85%] mx-auto">
      <div className="flex">
        <Navbar />
      </div>
      <div className="flex flex-1 w-full">{children}</div>
    </main>
  );
}

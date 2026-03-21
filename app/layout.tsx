import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Nexor — Super App",
  description: "Everything in one place. Your world, delivered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#f5f0e6] text-gray-900">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vault — Curated Commerce",
  description: "Objects worth owning. Curated products for the discerning individual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise-overlay antialiased">
        <main>{children}</main>
        <Footer />
        <Navbar />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "C++ Data Structures and Algorithms",
  description: "God-tier interactive C++ DSA curriculum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#020617] text-slate-200">
        {children}
      </body>
    </html>
  );
}

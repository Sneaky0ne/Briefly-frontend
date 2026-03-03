import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Briefly",
  description: "Бэк-офис для брендов и их UGC-креаторов"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}


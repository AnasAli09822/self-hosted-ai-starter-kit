import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tadafuq.ai - حلول الذكاء الاصطناعي",
  description: "نطور حلول ذكاء اصطناعي مبتكرة للشركات والمؤسسات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

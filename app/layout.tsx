// app/layout.client.tsx
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";
import { Providers } from "./redux/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

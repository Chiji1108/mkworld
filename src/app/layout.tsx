import { Navigation } from "@/components/navigation";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MKWorld Tools",
  description: "Mario Kart World custom driver and machine combination builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen bg-background px-4 sm:px-6 lg:px-8">{children}</main>
        <footer className="border-t bg-background py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          © 2025{" "}
          <Link
            href="https://x.com/chiji1108"
            target="_blank"
            className="text-primary hover:underline"
          >
            Chiji1108
          </Link>
          . All rights reserved.
        </footer>
      </body>
    </html>
  );
}

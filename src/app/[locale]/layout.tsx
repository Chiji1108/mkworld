import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MKWorld Tools - マリオカートワールド カスタムビルダー",
    template: "%s | MKWorld Tools",
  },
  description:
    "マリオカートワールドの50人のドライバーと40台のマシンを組み合わせて最適なカスタムビルドを作成。性能データの詳細分析とパレート最適化機能付き。",
  keywords: [
    "マリオカート",
    "Mario Kart",
    "カスタムビルダー",
    "性能分析",
    "ドライバー",
    "マシン",
    "最適化",
    "ゲーム攻略",
  ],
  authors: [{ name: "Chiji1108", url: "https://x.com/chiji1108" }],
  creator: "Chiji1108",
  publisher: "MKWorld Tools",
  metadataBase: new URL("https://mkworld-tools.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://mkworld-tools.vercel.app",
    siteName: "MKWorld Tools",
    title: "MKWorld Tools - マリオカートワールド カスタムビルダー",
    description:
      "マリオカートワールドの50人のドライバーと40台のマシンを組み合わせて最適なカスタムビルドを作成。性能データの詳細分析とパレート最適化機能付き。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MKWorld Tools - マリオカートワールド カスタムビルダー",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@chiji1108",
    creator: "@chiji1108",
    title: "MKWorld Tools - マリオカートワールド カスタムビルダー",
    description:
      "マリオカートワールドの50人のドライバーと40台のマシンを組み合わせて最適なカスタムビルドを作成。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <head>
        <StructuredData
          type="website"
          data={{
            name: "MKWorld Tools",
            description:
              "マリオカートワールドの50人のドライバーと40台のマシンを組み合わせて最適なカスタムビルドを作成。性能データの詳細分析とパレート最適化機能付き。",
            url: "https://mkworld-tools.vercel.app",
            author: {
              name: "Chiji1108",
              url: "https://x.com/chiji1108",
            },
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <NuqsAdapter>
            <Navigation />
            <main className="min-h-screen bg-background px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </NuqsAdapter>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

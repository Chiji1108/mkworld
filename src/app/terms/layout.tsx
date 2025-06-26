import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
  description: "MKWorld Tools利用規約 - 商用利用、SNS投稿、動画配信での使用条件や禁止事項について詳しく説明しています。",
  keywords: ["利用規約", "MKWorld Tools", "商用利用", "著作権", "免責事項"],
  openGraph: {
    title: "利用規約 | MKWorld Tools",
    description: "MKWorld Tools利用規約 - 商用利用、SNS投稿、動画配信での使用条件について",
    url: "https://mkworld-tools.vercel.app/terms",
  },
  twitter: {
    title: "利用規約 | MKWorld Tools",
    description: "MKWorld Tools利用規約 - 商用利用、SNS投稿、動画配信での使用条件について",
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
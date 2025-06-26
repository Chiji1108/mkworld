import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カスタムビルダー",
  description: "マリオカートワールドのドライバーとマシンを組み合わせてカスタムビルドを作成。リアルタイムで性能統計を確認し、最適な組み合わせを見つけましょう。",
  keywords: ["マリオカート", "カスタムビルダー", "ドライバー", "マシン", "組み合わせ", "性能分析"],
  openGraph: {
    title: "カスタムビルダー | MKWorld Tools",
    description: "ドライバーとマシンを組み合わせてカスタムビルドを作成。リアルタイムで性能統計を確認できます。",
    url: "https://mkworld-tools.vercel.app/builder",
  },
  twitter: {
    title: "カスタムビルダー | MKWorld Tools",
    description: "ドライバーとマシンを組み合わせてカスタムビルドを作成。リアルタイムで性能統計を確認できます。",
  },
};

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
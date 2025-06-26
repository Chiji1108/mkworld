import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "性能一覧",
  description: "マリオカートワールドの全50人のドライバーと40台のマシンの詳細な性能データを一覧で確認。スピード特化、バランス型などの特性も分析できます。",
  keywords: ["マリオカート", "性能一覧", "ドライバー", "マシン", "スピード", "かそく", "まがりやすさ", "おもさ"],
  openGraph: {
    title: "性能一覧 | MKWorld Tools",
    description: "全50人のドライバーと40台のマシンの詳細な性能データを一覧で確認できます。",
    url: "https://mkworld-tools.vercel.app/performance",
  },
  twitter: {
    title: "性能一覧 | MKWorld Tools",
    description: "全50人のドライバーと40台のマシンの詳細な性能データを一覧で確認できます。",
  },
};

export default function PerformanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
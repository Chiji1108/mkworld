import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "パレート最適",
  description: "マリオカートワールドで指定した条件に基づいて最適なドライバーとマシンの組み合わせを自動検索。パレート最適化により最高の性能バランスを実現します。",
  keywords: ["マリオカート", "パレート最適", "最適化", "組み合わせ", "自動検索", "性能バランス"],
  openGraph: {
    title: "パレート最適 | MKWorld Tools",
    description: "指定した条件に基づいて最適なドライバーとマシンの組み合わせを自動検索できます。",
    url: "https://mkworld-tools.vercel.app/pareto",
  },
  twitter: {
    title: "パレート最適 | MKWorld Tools",
    description: "指定した条件に基づいて最適なドライバーとマシンの組み合わせを自動検索できます。",
  },
};

export default function ParetoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
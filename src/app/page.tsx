import { TweetCard } from "@/components/magicui/tweet-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DRIVERS, MACHINES } from "@/lib/stats";
import { BarChart3, Car, Target } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "性能一覧",
      description: "全ドライバーとマシンの詳細な性能データを確認",
      icon: BarChart3,
      href: "/performance",
      stats: `${DRIVERS.length}ドライバー・${MACHINES.length}マシン`,
    },
    {
      title: "カスタムビルダー",
      description: "ドライバーとマシンを組み合わせて最適な性能を作成",
      icon: Car,
      href: "/builder",
      stats: "無限の組み合わせ",
    },
    {
      title: "パレート最適",
      description: "指定した条件に基づいて最適な組み合わせを自動検索",
      icon: Target,
      href: "/pareto",
      stats: "AIによる最適化",
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-2xl font-bold lg:text-4xl">MKWorld Tools</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              className="relative overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <p className="text-sm text-blue-600 font-medium">
                      {feature.stats}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  {feature.description}
                </CardDescription>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Link href={feature.href}>使ってみる</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            開発の参考になったツイート
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            このWebアプリの開発にあたって参考にさせていただいた、素晴らしいツイートをご紹介します
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="flex justify-center">
            <TweetCard
              id="1934907959110488460"
              className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div className="flex justify-center">
            <TweetCard
              id="1937519504999022884"
              className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div className="flex justify-center">
            <TweetCard
              id="1937356387379810695"
              className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            ツイートを投稿してくださった皆様に感謝いたします 🙏
          </p>
        </div>
      </div>
    </div>
  );
}

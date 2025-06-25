import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Car, Target, Users, Cog } from "lucide-react";
import { DRIVERS, MACHINES } from "@/lib/stats";

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
      <div className="text-center mb-16">
        <div className="flex justify-center items-center mb-6">
          <Car className="h-16 w-16 text-blue-600 mr-4" />
          <h1 className="text-5xl font-bold text-blue-600">
            MKWorld Tools
          </h1>
        </div>
        <h2 className="text-2xl font-medium text-muted-foreground mb-4">
          Mario Kart World Custom Builder
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          ドライバーとマシンの組み合わせを分析し、最適な性能を見つけましょう。
          50種類のドライバーと40種類のマシンから、あなただけの最強コンビを作成できます。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <p className="text-sm text-blue-600 font-medium">{feature.stats}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-base">
                  {feature.description}
                </CardDescription>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href={feature.href}>
                    使ってみる
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>ドライバー統計</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>総ドライバー数</span>
                <span className="font-semibold">{DRIVERS.length}キャラクター</span>
              </div>
              <div className="flex justify-between">
                <span>性能カテゴリ</span>
                <span className="font-semibold">6種類</span>
              </div>
              <div className="flex justify-between">
                <span>スピードタイプ</span>
                <span className="font-semibold">3種類 (スムーズ・ラフ・水中)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Cog className="h-5 w-5 text-blue-600" />
              <span>マシン統計</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>総マシン数</span>
                <span className="font-semibold">{MACHINES.length}台</span>
              </div>
              <div className="flex justify-between">
                <span>カートとバイク</span>
                <span className="font-semibold">両方対応</span>
              </div>
              <div className="flex justify-between">
                <span>可能な組み合わせ</span>
                <span className="font-semibold">{DRIVERS.length * MACHINES.length}通り</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

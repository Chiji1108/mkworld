"use client";

import { useState } from "react";
import Image from "next/image";
import { GROUPED_DRIVERS, GROUPED_MACHINES, type GroupedStats } from "@/lib/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Cell } from "recharts";

interface CombinedStats {
  speed: { smooth: number; rough: number; water: number };
  acceleration: number;
  weight: number;
  handling: number;
}

export default function BuilderPage() {
  const [selectedDriver, setSelectedDriver] = useState<GroupedStats | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<GroupedStats | null>(null);

  const getCombinedStats = (): CombinedStats | null => {
    if (!selectedDriver || !selectedMachine) return null;
    
    return {
      speed: {
        smooth: selectedDriver.speed.smooth + selectedMachine.speed.smooth,
        rough: selectedDriver.speed.rough + selectedMachine.speed.rough,
        water: selectedDriver.speed.water + selectedMachine.speed.water,
      },
      acceleration: selectedDriver.acceleration + selectedMachine.acceleration,
      weight: selectedDriver.weight + selectedMachine.weight,
      handling: selectedDriver.handling + selectedMachine.handling,
    };
  };

  const combinedStats = getCombinedStats();

  const getBarChartData = () => {
    if (!selectedDriver || !selectedMachine) return [];
    
    return [
      { 
        name: "スピード（滑）", 
        driver: selectedDriver.speed.smooth, 
        machine: selectedMachine.speed.smooth,
        total: selectedDriver.speed.smooth + selectedMachine.speed.smooth
      },
      { 
        name: "スピード（荒）", 
        driver: selectedDriver.speed.rough, 
        machine: selectedMachine.speed.rough,
        total: selectedDriver.speed.rough + selectedMachine.speed.rough
      },
      { 
        name: "スピード（水）", 
        driver: selectedDriver.speed.water, 
        machine: selectedMachine.speed.water,
        total: selectedDriver.speed.water + selectedMachine.speed.water
      },
      { 
        name: "かそく", 
        driver: selectedDriver.acceleration, 
        machine: selectedMachine.acceleration,
        total: selectedDriver.acceleration + selectedMachine.acceleration
      },
      { 
        name: "おもさ", 
        driver: selectedDriver.weight, 
        machine: selectedMachine.weight,
        total: selectedDriver.weight + selectedMachine.weight
      },
      { 
        name: "まがりやすさ", 
        driver: selectedDriver.handling, 
        machine: selectedMachine.handling,
        total: selectedDriver.handling + selectedMachine.handling
      },
    ];
  };

  const getRadarChartData = () => {
    if (!combinedStats) return [];
    
    return [
      { subject: "スピード（滑）", value: combinedStats.speed.smooth, fullMark: 20 },
      { subject: "スピード（荒）", value: combinedStats.speed.rough, fullMark: 20 },
      { subject: "スピード（水）", value: combinedStats.speed.water, fullMark: 20 },
      { subject: "かそく", value: combinedStats.acceleration, fullMark: 20 },
      { subject: "おもさ", value: combinedStats.weight, fullMark: 20 },
      { subject: "まがりやすさ", value: combinedStats.handling, fullMark: 20 },
    ];
  };

  const renderSelector = (
    items: GroupedStats[],
    selected: GroupedStats | null,
    onSelect: (item: GroupedStats) => void,
    type: "driver" | "machine"
  ) => (
    <ScrollArea className="h-[400px] w-full rounded-md border">
      <div className="grid grid-cols-2 gap-2 p-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer rounded-lg border-2 p-2 transition-all",
              selected === item
                ? "border-primary bg-primary/10"
                : "border-transparent hover:border-gray-300",
              "hover:shadow-md"
            )}
            style={{ backgroundColor: selected === item ? undefined : item.color }}
            onClick={() => onSelect(item)}
          >
            <div className="space-y-2">
              {item.names.map((name) => (
                <div key={name} className="flex items-center space-x-2">
                  <div className="w-10 h-10 relative flex-shrink-0">
                    <Image
                      src={`/${type === "driver" ? "drivers" : "machines"}/${name}.png`}
                      alt={name}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                  <span className="text-xs">{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          カスタムビルダー
        </h1>
        <p className="text-muted-foreground">
          ドライバーとマシンを組み合わせて性能を確認できます
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>ドライバー選択</CardTitle>
          </CardHeader>
          <CardContent>
            {renderSelector(
              GROUPED_DRIVERS,
              selectedDriver,
              setSelectedDriver,
              "driver"
            )}

            {selectedDriver && (
              <div className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <Badge variant="outline">
                    スピード（滑） {selectedDriver.speed.smooth}
                  </Badge>
                  <Badge variant="outline">
                    スピード（荒） {selectedDriver.speed.rough}
                  </Badge>
                  <Badge variant="outline">
                    スピード（水） {selectedDriver.speed.water}
                  </Badge>
                  <Badge variant="outline">
                    かそく {selectedDriver.acceleration}
                  </Badge>
                  <Badge variant="outline">
                    おもさ {selectedDriver.weight}
                  </Badge>
                  <Badge variant="outline">
                    まがりやすさ {selectedDriver.handling}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>マシン選択</CardTitle>
          </CardHeader>
          <CardContent>
            {renderSelector(
              GROUPED_MACHINES,
              selectedMachine,
              setSelectedMachine,
              "machine"
            )}

            {selectedMachine && (
              <div className="mt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <Badge variant="outline">
                    スピード（滑） {selectedMachine.speed.smooth}
                  </Badge>
                  <Badge variant="outline">
                    スピード（荒） {selectedMachine.speed.rough}
                  </Badge>
                  <Badge variant="outline">
                    スピード（水） {selectedMachine.speed.water}
                  </Badge>
                  <Badge variant="outline">
                    かそく {selectedMachine.acceleration}
                  </Badge>
                  <Badge variant="outline">
                    おもさ {selectedMachine.weight}
                  </Badge>
                  <Badge variant="outline">
                    まがりやすさ {selectedMachine.handling}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {combinedStats && (
        <div className="space-y-6">
          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>合計性能</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Badge variant="outline" className="text-lg">
                  スピード（滑） {combinedStats.speed.smooth}
                </Badge>
                <Badge variant="outline" className="text-lg">
                  スピード（荒） {combinedStats.speed.rough}
                </Badge>
                <Badge variant="outline" className="text-lg">
                  スピード（水） {combinedStats.speed.water}
                </Badge>
                <Badge variant="outline" className="text-lg">
                  かそく {combinedStats.acceleration}
                </Badge>
                <Badge variant="outline" className="text-lg">
                  おもさ {combinedStats.weight}
                </Badge>
                <Badge variant="outline" className="text-lg">
                  まがりやすさ {combinedStats.handling}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>性能グラフ (棒グラフ)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={getBarChartData()}
                    layout="horizontal"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis type="number" domain={[0, 20]} />
                    <YAxis dataKey="name" type="category" width={90} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-2 border rounded shadow-sm">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm text-blue-600">
                                ドライバー: {data.driver}
                              </p>
                              <p className="text-sm text-green-600">
                                マシン: {data.machine}
                              </p>
                              <p className="text-sm font-medium">
                                合計: {data.total}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="driver"
                      stackId="a"
                      fill="#3b82f6"
                      name="ドライバー"
                      barSize={20}
                    />
                    <Bar
                      dataKey="machine"
                      stackId="a"
                      fill="#10b981"
                      name="マシン"
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>性能グラフ (レーダーチャート)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={getRadarChartData()}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 20]} />
                    <Radar
                      name="性能"
                      dataKey="value"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
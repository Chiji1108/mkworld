"use client";

import { useState } from "react";
import Image from "next/image";
import { DRIVERS, MACHINES, type Stats } from "@/lib/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

interface CombinedStats {
  speed: { smooth: number; rough: number; water: number };
  acceleration: number;
  weight: number;
  handling: number;
}

export default function BuilderPage() {
  const [selectedDriver, setSelectedDriver] = useState<Stats | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<Stats | null>(null);

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
    if (!combinedStats) return [];
    
    return [
      { name: "滑", value: combinedStats.speed.smooth, category: "スピード" },
      { name: "荒", value: combinedStats.speed.rough, category: "スピード" },
      { name: "水", value: combinedStats.speed.water, category: "スピード" },
      { name: "かそく", value: combinedStats.acceleration, category: "その他" },
      { name: "おもさ", value: combinedStats.weight, category: "その他" },
      { name: "まがりやすさ", value: combinedStats.handling, category: "その他" },
    ];
  };

  const getRadarChartData = () => {
    if (!combinedStats) return [];
    
    return [
      { subject: "滑", value: combinedStats.speed.smooth, fullMark: 20 },
      { subject: "荒", value: combinedStats.speed.rough, fullMark: 20 },
      { subject: "水", value: combinedStats.speed.water, fullMark: 20 },
      { subject: "かそく", value: combinedStats.acceleration, fullMark: 20 },
      { subject: "おもさ", value: combinedStats.weight, fullMark: 20 },
      { subject: "まがりやすさ", value: combinedStats.handling, fullMark: 20 },
    ];
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">カスタムビルダー</h1>
        <p className="text-muted-foreground">ドライバーとマシンを組み合わせて性能を確認できます</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>ドライバー選択</CardTitle>
          </CardHeader>
          <CardContent>
            <Select 
              value={selectedDriver?.name || ""} 
              onValueChange={(value) => {
                const driver = DRIVERS.find(d => d.name === value);
                setSelectedDriver(driver || null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="ドライバーを選択してください" />
              </SelectTrigger>
              <SelectContent>
                {DRIVERS.map((driver) => (
                  <SelectItem key={driver.name} value={driver.name}>
                    {driver.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedDriver && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={`/drivers/${selectedDriver.name}.png`}
                      alt={selectedDriver.name}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{selectedDriver.name}</h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">スピード:</span>
                    <Badge variant="outline">滑 {selectedDriver.speed.smooth}</Badge>
                    <Badge variant="outline">荒 {selectedDriver.speed.rough}</Badge>
                    <Badge variant="outline">水 {selectedDriver.speed.water}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">その他:</span>
                    <Badge variant="secondary">かそく {selectedDriver.acceleration}</Badge>
                    <Badge variant="secondary">おもさ {selectedDriver.weight}</Badge>
                    <Badge variant="secondary">まがりやすさ {selectedDriver.handling}</Badge>
                  </div>
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
            <Select 
              value={selectedMachine?.name || ""} 
              onValueChange={(value) => {
                const machine = MACHINES.find(m => m.name === value);
                setSelectedMachine(machine || null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="マシンを選択してください" />
              </SelectTrigger>
              <SelectContent>
                {MACHINES.map((machine) => (
                  <SelectItem key={machine.name} value={machine.name}>
                    {machine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedMachine && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={`/machines/${selectedMachine.name}.png`}
                      alt={selectedMachine.name}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{selectedMachine.name}</h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">スピード:</span>
                    <Badge variant="outline">滑 {selectedMachine.speed.smooth}</Badge>
                    <Badge variant="outline">荒 {selectedMachine.speed.rough}</Badge>
                    <Badge variant="outline">水 {selectedMachine.speed.water}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-sm font-medium">その他:</span>
                    <Badge variant="secondary">かそく {selectedMachine.acceleration}</Badge>
                    <Badge variant="secondary">おもさ {selectedMachine.weight}</Badge>
                    <Badge variant="secondary">まがりやすさ {selectedMachine.handling}</Badge>
                  </div>
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
              <div className="space-y-4">
                <div className="flex gap-2">
                  <span className="text-lg font-medium">スピード:</span>
                  <Badge variant="outline" className="text-lg">滑 {combinedStats.speed.smooth}</Badge>
                  <Badge variant="outline" className="text-lg">荒 {combinedStats.speed.rough}</Badge>
                  <Badge variant="outline" className="text-lg">水 {combinedStats.speed.water}</Badge>
                </div>
                <div className="flex gap-2">
                  <span className="text-lg font-medium">その他:</span>
                  <Badge variant="secondary" className="text-lg">かそく {combinedStats.acceleration}</Badge>
                  <Badge variant="secondary" className="text-lg">おもさ {combinedStats.weight}</Badge>
                  <Badge variant="secondary" className="text-lg">まがりやすさ {combinedStats.handling}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>性能グラフ (棒グラフ)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getBarChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>性能グラフ (レーダーチャート)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
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
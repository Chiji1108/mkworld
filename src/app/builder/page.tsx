"use client";

import { useState } from "react";
import Image from "next/image";
import { GROUPED_DRIVERS, GROUPED_MACHINES, type GroupedStats } from "@/lib/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";


export default function BuilderPage() {
  const [selectedDriver, setSelectedDriver] = useState<GroupedStats | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<GroupedStats | null>(null);


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
              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-lg border" style={{ backgroundColor: selectedDriver.color }}>
                  <h4 className="font-medium mb-3">選択中のドライバー</h4>
                  <div className="space-y-3">
                    {selectedDriver.names.map((name) => (
                      <div key={name} className="flex items-center space-x-3">
                        <div className="w-8 h-8 relative flex-shrink-0">
                          <Image
                            src={`/drivers/${name}.png`}
                            alt={name}
                            fill
                            className="object-contain rounded"
                          />
                        </div>
                        <span className="text-sm font-medium">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "スピード（滑）", value: selectedDriver.speed.smooth },
                    { name: "スピード（荒）", value: selectedDriver.speed.rough },
                    { name: "スピード（水）", value: selectedDriver.speed.water },
                    { name: "かそく", value: selectedDriver.acceleration },
                    { name: "おもさ", value: selectedDriver.weight },
                    { name: "まがりやすさ", value: selectedDriver.handling },
                  ].map((stat) => {
                    const percent = (stat.value / 10) * 100;
                    return (
                      <div key={stat.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{stat.name}</span>
                          <span className="text-sm font-bold">{stat.value}</span>
                        </div>
                        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500 ease-out"
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
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
              <div className="mt-4 space-y-4">
                <div className="p-4 rounded-lg border" style={{ backgroundColor: selectedMachine.color }}>
                  <h4 className="font-medium mb-3">選択中のマシン</h4>
                  <div className="space-y-3">
                    {selectedMachine.names.map((name) => (
                      <div key={name} className="flex items-center space-x-3">
                        <div className="w-8 h-8 relative flex-shrink-0">
                          <Image
                            src={`/machines/${name}.png`}
                            alt={name}
                            fill
                            className="object-contain rounded"
                          />
                        </div>
                        <span className="text-sm font-medium">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "スピード（滑）", value: selectedMachine.speed.smooth },
                    { name: "スピード（荒）", value: selectedMachine.speed.rough },
                    { name: "スピード（水）", value: selectedMachine.speed.water },
                    { name: "かそく", value: selectedMachine.acceleration },
                    { name: "おもさ", value: selectedMachine.weight },
                    { name: "まがりやすさ", value: selectedMachine.handling },
                  ].map((stat) => {
                    const percent = (stat.value / 10) * 100;
                    return (
                      <div key={stat.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{stat.name}</span>
                          <span className="text-sm font-bold">{stat.value}</span>
                        </div>
                        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-500 ease-out"
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedDriver && selectedMachine && (
        <div className="mt-8">
          <Separator className="mb-8" />
          
          <Card>
            <CardHeader>
              <CardTitle>合計性能</CardTitle>
              <div className="flex items-center gap-6 text-base w-full justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded"></div>
                  <span>ドライバー</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded"></div>
                  <span>マシン</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "スピード（滑）", driver: selectedDriver.speed.smooth, machine: selectedMachine.speed.smooth },
                  { name: "スピード（荒）", driver: selectedDriver.speed.rough, machine: selectedMachine.speed.rough },
                  { name: "スピード（水）", driver: selectedDriver.speed.water, machine: selectedMachine.speed.water },
                  { name: "かそく", driver: selectedDriver.acceleration, machine: selectedMachine.acceleration },
                  { name: "おもさ", driver: selectedDriver.weight, machine: selectedMachine.weight },
                  { name: "まがりやすさ", driver: selectedDriver.handling, machine: selectedMachine.handling },
                ].map((stat) => {
                  const total = stat.driver + stat.machine;
                  const driverPercent = (stat.driver / 20) * 100;
                  const machinePercent = (stat.machine / 20) * 100;
                  
                  return (
                    <div key={stat.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{stat.name}</span>
                        <div className="flex items-center gap-3 text-base">
                          <span className="text-blue-600 font-medium">{stat.driver}</span>
                          <span className="text-gray-400">+</span>
                          <span className="text-green-600 font-medium">{stat.machine}</span>
                          <span className="text-gray-400">=</span>
                          <span className="font-bold">{total}</span>
                        </div>
                      </div>
                      <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500 ease-out"
                          style={{ width: `${Math.min(driverPercent, 100)}%` }}
                        ></div>
                        <div 
                          className="absolute top-0 h-full bg-green-500 transition-all duration-500 ease-out"
                          style={{ 
                            left: `${Math.min(driverPercent, 100)}%`,
                            width: `${Math.min(machinePercent, 100 - Math.min(driverPercent, 100))}%`
                          }}
                        ></div>
                        {/* Scale markers */}
                        <div className="absolute inset-0 flex">
                          {[5, 10, 15].map((marker) => (
                            <div
                              key={marker}
                              className="absolute top-0 bottom-0 w-px bg-white/70"
                              style={{ left: `${(marker / 20) * 100}%` }}
                            ></div>
                          ))}
                        </div>
                        {/* Scale labels */}
                        <div className="absolute inset-x-0 -bottom-8 flex justify-between text-sm text-gray-500">
                          <span>0</span>
                          <span>5</span>
                          <span>10</span>
                          <span>15</span>
                          <span>20</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
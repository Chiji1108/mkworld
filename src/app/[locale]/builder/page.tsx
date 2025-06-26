"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  GROUPED_DRIVERS,
  GROUPED_MACHINES,
  type GroupedStats,
} from "@/lib/stats";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function BuilderPage() {
  const t = useTranslations();
  const [selectedDriver, setSelectedDriver] = useState<GroupedStats | null>(
    null
  );
  const [selectedMachine, setSelectedMachine] = useState<GroupedStats | null>(
    null
  );

  const renderSelector = (
    items: GroupedStats[],
    selected: GroupedStats | null,
    onSelect: (item: GroupedStats) => void,
    placeholder: string
  ) => (
    <Select
      value={selected ? items.indexOf(selected).toString() : ""}
      onValueChange={(value) => {
        const index = parseInt(value);
        if (index >= 0 && index < items.length) {
          onSelect(items[index]);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder}>
          {selected && (
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: selected.color }}
              ></div>
              <span>{selected.names.join(", ")}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {items.map((item, index) => (
          <SelectItem key={index} value={index.toString()}>
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.names.join(", ")}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          {t("builder.pageTitle")}
        </h1>
        <p className="text-muted-foreground">{t("builder.description")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("builder.driverSelection.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderSelector(
              GROUPED_DRIVERS,
              selectedDriver,
              setSelectedDriver,
              t("builder.driverSelection.placeholder")
            )}

            {selectedDriver && (
              <div className="mt-4 space-y-4">
                <div
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: selectedDriver.color }}
                >
                  <h4 className="font-medium mb-3">
                    {t("builder.driverSelection.title")}
                  </h4>
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
                    {
                      name: t("stats.speedHard"),
                      value: selectedDriver.speed.hard,
                    },
                    {
                      name: t("stats.speedSoft"),
                      value: selectedDriver.speed.soft,
                    },
                    {
                      name: t("stats.speedLiquid"),
                      value: selectedDriver.speed.liquid,
                    },
                    {
                      name: t("stats.acceleration"),
                      value: selectedDriver.acceleration,
                    },
                    { name: t("stats.weight"), value: selectedDriver.weight },
                    {
                      name: t("stats.handling"),
                      value: selectedDriver.handling,
                    },
                  ].map((stat) => {
                    const percent = (stat.value / 10) * 100;
                    return (
                      <div key={stat.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {stat.name}
                          </span>
                          <span className="text-sm font-bold">
                            {stat.value}
                          </span>
                        </div>
                        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500 ease-out"
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          ></div>
                          {/* Scale markers */}
                          <div className="absolute inset-0 flex">
                            {[2.5, 5, 7.5].map((marker) => (
                              <div
                                key={marker}
                                className="absolute top-0 bottom-0 w-px bg-white/70"
                                style={{ left: `${(marker / 10) * 100}%` }}
                              ></div>
                            ))}
                          </div>
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
            <CardTitle>{t("builder.machineSelection.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderSelector(
              GROUPED_MACHINES,
              selectedMachine,
              setSelectedMachine,
              t("builder.machineSelection.placeholder")
            )}

            {selectedMachine && (
              <div className="mt-4 space-y-4">
                <div
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: selectedMachine.color }}
                >
                  <h4 className="font-medium mb-3">
                    {t("builder.machineSelection.title")}
                  </h4>
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
                    {
                      name: t("stats.speedHard"),
                      value: selectedMachine.speed.hard,
                    },
                    {
                      name: t("stats.speedSoft"),
                      value: selectedMachine.speed.soft,
                    },
                    {
                      name: t("stats.speedLiquid"),
                      value: selectedMachine.speed.liquid,
                    },
                    {
                      name: t("stats.acceleration"),
                      value: selectedMachine.acceleration,
                    },
                    { name: t("stats.weight"), value: selectedMachine.weight },
                    {
                      name: t("stats.handling"),
                      value: selectedMachine.handling,
                    },
                  ].map((stat) => {
                    const percent = (stat.value / 10) * 100;
                    return (
                      <div key={stat.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {stat.name}
                          </span>
                          <span className="text-sm font-bold">
                            {stat.value}
                          </span>
                        </div>
                        <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-500 ease-out"
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          ></div>
                          {/* Scale markers */}
                          <div className="absolute inset-0 flex">
                            {[2.5, 5, 7.5].map((marker) => (
                              <div
                                key={marker}
                                className="absolute top-0 bottom-0 w-px bg-white/70"
                                style={{ left: `${(marker / 10) * 100}%` }}
                              ></div>
                            ))}
                          </div>
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
              <CardTitle className="mb-4">
                {t("builder.statsDisplay.title")}
              </CardTitle>
              <div className="flex items-center gap-6 text-base w-full justify-center">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded"></div>
                  <span>{t("stats.driver")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-500 rounded"></div>
                  <span>{t("stats.machine")}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: t("stats.speedHard"),
                    driver: selectedDriver.speed.hard,
                    machine: selectedMachine.speed.hard,
                  },
                  {
                    name: t("stats.speedSoft"),
                    driver: selectedDriver.speed.soft,
                    machine: selectedMachine.speed.soft,
                  },
                  {
                    name: t("stats.speedLiquid"),
                    driver: selectedDriver.speed.liquid,
                    machine: selectedMachine.speed.liquid,
                  },
                  {
                    name: t("stats.acceleration"),
                    driver: selectedDriver.acceleration,
                    machine: selectedMachine.acceleration,
                  },
                  {
                    name: t("stats.weight"),
                    driver: selectedDriver.weight,
                    machine: selectedMachine.weight,
                  },
                  {
                    name: t("stats.handling"),
                    driver: selectedDriver.handling,
                    machine: selectedMachine.handling,
                  },
                ].map((stat) => {
                  const total = stat.driver + stat.machine;
                  const driverPercent = (stat.driver / 20) * 100;
                  const machinePercent = (stat.machine / 20) * 100;

                  return (
                    <div key={stat.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{stat.name}</span>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-blue-600 font-medium">
                            {stat.driver}
                          </span>
                          <span className="text-gray-400">+</span>
                          <span className="text-green-600 font-medium">
                            {stat.machine}
                          </span>
                          <span className="text-gray-400">=</span>
                          <span className="font-bold">{total}</span>
                        </div>
                      </div>
                      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-500 ease-out"
                          style={{ width: `${Math.min(driverPercent, 100)}%` }}
                        ></div>
                        <div
                          className="absolute top-0 h-full bg-green-500 transition-all duration-500 ease-out"
                          style={{
                            left: `${Math.min(driverPercent, 100)}%`,
                            width: `${Math.min(
                              machinePercent,
                              100 - Math.min(driverPercent, 100)
                            )}%`,
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

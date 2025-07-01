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
  analyzeSpeedSpecialization,
} from "@/lib/stats";
import {
  getDriverTranslationKey,
  getMachineTranslationKey,
  translateDriverName,
  translateMachineName,
} from "@/lib/translation-helpers";
import { Droplets, Info, Mountain, Waves } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useQueryState } from "nuqs";

export default function BuilderPage() {
  const t = useTranslations();

  // URL状態管理用のヘルパー関数
  const findDriverByKey = (key: string): GroupedStats | null => {
    if (!key || key === "") return null;
    return (
      GROUPED_DRIVERS.find((driver) =>
        driver.names.some((name) => getDriverTranslationKey(name) === key)
      ) || null
    );
  };

  const findMachineByKey = (key: string): GroupedStats | null => {
    if (!key || key === "") return null;
    return (
      GROUPED_MACHINES.find((machine) =>
        machine.names.some((name) => getMachineTranslationKey(name) === key)
      ) || null
    );
  };

  const getDriverKey = (driver: GroupedStats | null): string => {
    if (!driver) return "";
    return getDriverTranslationKey(driver.names[0]);
  };

  const getMachineKey = (machine: GroupedStats | null): string => {
    if (!machine) return "";
    return getMachineTranslationKey(machine.names[0]);
  };

  // nuqsでURL状態管理
  const [driverKey, setDriverKey] = useQueryState("driver", {
    defaultValue: "",
    parse: (value) => (value === "" ? "" : value),
    serialize: (value) => value,
  });

  const [machineKey, setMachineKey] = useQueryState("machine", {
    defaultValue: "",
    parse: (value) => (value === "" ? "" : value),
    serialize: (value) => value,
  });

  // URLから状態を復元
  const selectedDriver = findDriverByKey(driverKey);
  const selectedMachine = findMachineByKey(machineKey);

  // 選択変更時の処理
  const handleDriverSelect = (driver: GroupedStats) => {
    setDriverKey(getDriverKey(driver));
  };

  const handleMachineSelect = (machine: GroupedStats) => {
    setMachineKey(getMachineKey(machine));
  };

  const getSpecializationIcon = (item: GroupedStats) => {
    const specialization = analyzeSpeedSpecialization(item);
    switch (specialization) {
      case "hard":
        return <Mountain className="w-3 h-3" />;
      case "soft":
        return <Waves className="w-3 h-3" />;
      case "liquid":
        return <Droplets className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const renderSelector = (
    items: GroupedStats[],
    selected: GroupedStats | null,
    onSelect: (item: GroupedStats) => void,
    placeholder: string,
    type: "driver" | "machine"
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
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: selected.color }}
              >
                {getSpecializationIcon(selected)}
              </div>
              <span>
                {selected.names
                  .map((name) =>
                    type === "driver"
                      ? translateDriverName(name, t)
                      : translateMachineName(name, t)
                  )
                  .join(", ")}
              </span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {items.map((item, index) => (
          <SelectItem key={index} value={index.toString()}>
            <div className="flex items-center space-x-3">
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: item.color }}
              >
                {getSpecializationIcon(item)}
              </div>
              <span>
                {item.names
                  .map((name) =>
                    type === "driver"
                      ? translateDriverName(name, t)
                      : translateMachineName(name, t)
                  )
                  .join(", ")}
              </span>
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

      {/* Speed Info Section */}
      <Card className="mb-8 border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Info className="w-5 h-5" />
            {t("performance.speedInfo.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-stone-100 border border-stone-200">
              <Mountain className="w-5 h-5 text-stone-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-stone-700 mb-1">
                  {t("performance.speedInfo.hard.title")}
                </h4>
                <p className="text-sm text-stone-600">
                  {t("performance.speedInfo.hard.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-100 border border-amber-200">
              <Waves className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-700 mb-1">
                  {t("performance.speedInfo.soft.title")}
                </h4>
                <p className="text-sm text-amber-600">
                  {t("performance.speedInfo.soft.description")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-100 border border-blue-200">
              <Droplets className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-700 mb-1">
                  {t("performance.speedInfo.liquid.title")}
                </h4>
                <p className="text-sm text-blue-600">
                  {t("performance.speedInfo.liquid.description")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("builder.driverSelection.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderSelector(
              GROUPED_DRIVERS,
              selectedDriver,
              handleDriverSelect,
              t("builder.driverSelection.placeholder"),
              "driver"
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
                            alt={translateDriverName(name, t)}
                            fill
                            className="object-contain rounded"
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {translateDriverName(name, t)}
                        </span>
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
                            {[5].map((marker) => (
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
              handleMachineSelect,
              t("builder.machineSelection.placeholder"),
              "machine"
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
                            alt={translateMachineName(name, t)}
                            fill
                            className="object-contain rounded"
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {translateMachineName(name, t)}
                        </span>
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
                            {[5].map((marker) => (
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

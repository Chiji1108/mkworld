"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SpeedSpecialization } from "@/lib/stats";
import {
  GROUPED_DRIVERS,
  GROUPED_MACHINES,
  type GroupedStats,
  analyzeSpeedSpecialization,
} from "@/lib/stats";
import {
  translateDriverName,
  translateMachineName,
} from "@/lib/translation-helpers";
import { Droplets, Info, Mountain, Waves } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useQueryState } from "nuqs";

export default function PerformancePage() {
  const t = useTranslations();
  // nuqsでURL状態管理
  const [driverSearch, setDriverSearch] = useQueryState("driverSearch", {
    defaultValue: "",
    parse: (value) => (value === "" ? "" : value),
    serialize: (value) => value,
  });

  const [machineSearch, setMachineSearch] = useQueryState("machineSearch", {
    defaultValue: "",
    parse: (value) => (value === "" ? "" : value),
    serialize: (value) => value,
  });

  const [driverSpecFilter, setDriverSpecFilter] = useQueryState(
    "driverSpecFilter",
    {
      defaultValue: "all" as SpeedSpecialization | "all",
      parse: (value) => value as SpeedSpecialization | "all",
      serialize: (value) => value,
    }
  );

  const [machineSpecFilter, setMachineSpecFilter] = useQueryState(
    "machineSpecFilter",
    {
      defaultValue: "all" as SpeedSpecialization | "all",
      parse: (value) => value as SpeedSpecialization | "all",
      serialize: (value) => value,
    }
  );

  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "drivers",
    parse: (value) => (value === "machines" ? "machines" : "drivers"),
    serialize: (value) => value,
  });

  const filteredDrivers = GROUPED_DRIVERS.filter((driver) => {
    const matchesSearch = driver.names.some((name) => {
      const japaneseName = name.toLowerCase();
      const translatedName = translateDriverName(name, t).toLowerCase();
      return (
        japaneseName.includes(driverSearch.toLowerCase()) ||
        translatedName.includes(driverSearch.toLowerCase())
      );
    });
    const matchesSpec =
      driverSpecFilter === "all" ||
      analyzeSpeedSpecialization(driver) === driverSpecFilter;
    return matchesSearch && matchesSpec;
  });

  const filteredMachines = GROUPED_MACHINES.filter((machine) => {
    const matchesSearch = machine.names.some((name) => {
      const japaneseName = name.toLowerCase();
      const translatedName = translateMachineName(name, t).toLowerCase();
      return (
        japaneseName.includes(machineSearch.toLowerCase()) ||
        translatedName.includes(machineSearch.toLowerCase())
      );
    });
    const matchesSpec =
      machineSpecFilter === "all" ||
      analyzeSpeedSpecialization(machine) === machineSpecFilter;
    return matchesSearch && matchesSpec;
  });

  const renderStatsTable = (
    items: GroupedStats[],
    searchValue: string,
    onSearchChange: (value: string) => void,
    type: "driver" | "machine",
    specFilter: SpeedSpecialization | "all",
    onSpecFilterChange: (value: SpeedSpecialization | "all") => void
  ) => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <Input
          placeholder={t("performance.search.placeholder")}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:max-w-sm"
        />
        <Tabs
          value={specFilter}
          onValueChange={(value) =>
            onSpecFilterChange(value as SpeedSpecialization | "all")
          }
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full sm:w-auto grid grid-cols-5 sm:flex">
            <TabsTrigger
              value="all"
              className="text-[10px] sm:text-sm px-1 sm:px-3"
            >
              {t("performance.filters.all")}
            </TabsTrigger>
            <TabsTrigger
              value="hard"
              className="text-[10px] sm:text-sm px-1 sm:px-3"
            >
              <Mountain className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">
                {t("performance.filters.hard")}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="soft"
              className="text-[10px] sm:text-sm px-1 sm:px-3"
            >
              <Waves className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">
                {t("performance.filters.soft")}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="liquid"
              className="text-[10px] sm:text-sm px-1 sm:px-3"
            >
              <Droplets className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">
                {t("performance.filters.liquid")}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="balance"
              className="text-[10px] sm:text-sm px-1 sm:px-3"
            >
              {t("performance.filters.balance")}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-[10px] sm:text-sm">
                {type === "driver" ? t("stats.driver") : t("stats.machine")}
              </TableHead>
              <TableHead className="flex-1 text-center text-[10px] sm:text-sm px-1 sm:px-3">
                <span className="hidden sm:inline">{t("stats.speedHard")}</span>
                <span className="sm:hidden">{t("stats.speedHardShort")}</span>
              </TableHead>
              <TableHead className="flex-1 text-center text-[10px] sm:text-sm px-1 sm:px-3">
                <span className="hidden sm:inline">{t("stats.speedSoft")}</span>
                <span className="sm:hidden">{t("stats.speedSoftShort")}</span>
              </TableHead>
              <TableHead className="flex-1 text-center text-[10px] sm:text-sm px-1 sm:px-3">
                <span className="hidden sm:inline">
                  {t("stats.speedLiquid")}
                </span>
                <span className="sm:hidden">{t("stats.speedLiquidShort")}</span>
              </TableHead>
              <TableHead className="flex-1 text-center text-[10px] sm:text-sm px-1 sm:px-3">
                <span className="hidden sm:inline">
                  {t("stats.acceleration")}
                </span>
                <span className="sm:hidden">
                  {t("stats.accelerationShort")}
                </span>
              </TableHead>
              <TableHead className="flex-1 text-center text-[10px] sm:text-sm px-1 sm:px-3">
                <span className="hidden sm:inline">{t("stats.weight")}</span>
                <span className="sm:hidden">{t("stats.weightShort")}</span>
              </TableHead>
              <TableHead className="flex-1 text-center text-[10px] sm:text-sm px-1 sm:px-3">
                <span className="hidden sm:inline">
                  {t("stats.handlingHard")}
                </span>
                <span className="sm:hidden">
                  {t("stats.handlingHardShort")}
                </span>
              </TableHead>
              <TableHead className="flex-1 text-center text-[10px] sm:text-sm px-1 sm:px-3">
                <span className="hidden sm:inline">
                  {t("stats.handlingSoft")}
                </span>
                <span className="sm:hidden">
                  {t("stats.handlingSoftShort")}
                </span>
              </TableHead>
              <TableHead className="flex-1 text-center text-[10px] sm:text-sm px-1 sm:px-3">
                <span className="hidden sm:inline">
                  {t("stats.handlingLiquid")}
                </span>
                <span className="sm:hidden">
                  {t("stats.handlingLiquidShort")}
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              const specialization = analyzeSpeedSpecialization(item);
              return (
                <TableRow key={index} style={{ backgroundColor: item.color }}>
                  <TableCell className="font-medium">
                    <div className="space-y-2">
                      {item.names.map((name) => (
                        <div
                          key={name}
                          className="flex items-center space-x-2 sm:space-x-3"
                        >
                          <div className="w-6 h-6 sm:w-10 sm:h-10 relative flex-shrink-0">
                            <Image
                              src={`/${
                                type === "driver" ? "drivers" : "machines"
                              }/${name}.png`}
                              alt={name}
                              fill
                              className="object-contain rounded"
                            />
                          </div>
                          <span className="text-[11px] sm:text-sm">
                            {type === "driver"
                              ? translateDriverName(name, t)
                              : translateMachineName(name, t)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-[11px] sm:text-sm px-1 sm:px-3">
                    {specialization === "hard" ? (
                      <Badge
                        variant="default"
                        className="text-[10px] sm:text-xs px-1 sm:px-2 py-0 sm:py-1"
                      >
                        {item.speed.hard}
                      </Badge>
                    ) : (
                      item.speed.hard
                    )}
                  </TableCell>
                  <TableCell className="text-center text-[11px] sm:text-sm px-1 sm:px-3">
                    {specialization === "soft" ? (
                      <Badge
                        variant="default"
                        className="text-[10px] sm:text-xs px-1 sm:px-2 py-0 sm:py-1"
                      >
                        {item.speed.soft}
                      </Badge>
                    ) : (
                      item.speed.soft
                    )}
                  </TableCell>
                  <TableCell className="text-center text-[11px] sm:text-sm px-1 sm:px-3">
                    {specialization === "liquid" ? (
                      <Badge
                        variant="default"
                        className="text-[10px] sm:text-xs px-1 sm:px-2 py-0 sm:py-1"
                      >
                        {item.speed.liquid}
                      </Badge>
                    ) : (
                      item.speed.liquid
                    )}
                  </TableCell>
                  <TableCell className="text-center text-[11px] sm:text-sm px-1 sm:px-3">
                    {item.acceleration}
                  </TableCell>
                  <TableCell className="text-center text-[11px] sm:text-sm px-1 sm:px-3">
                    {item.weight}
                  </TableCell>
                  <TableCell className="text-center text-[11px] sm:text-sm px-1 sm:px-3">
                    {specialization === "hard" ? (
                      <Badge
                        variant="default"
                        className="text-[10px] sm:text-xs px-1 sm:px-2 py-0 sm:py-1"
                      >
                        {item.handling.hard}
                      </Badge>
                    ) : (
                      item.handling.hard
                    )}
                  </TableCell>
                  <TableCell className="text-center text-[11px] sm:text-sm px-1 sm:px-3">
                    {specialization === "soft" ? (
                      <Badge
                        variant="default"
                        className="text-[10px] sm:text-xs px-1 sm:px-2 py-0 sm:py-1"
                      >
                        {item.handling.soft}
                      </Badge>
                    ) : (
                      item.handling.soft
                    )}
                  </TableCell>
                  <TableCell className="text-center text-[11px] sm:text-sm px-1 sm:px-3">
                    {specialization === "liquid" ? (
                      <Badge
                        variant="default"
                        className="text-[10px] sm:text-xs px-1 sm:px-2 py-0 sm:py-1"
                      >
                        {item.handling.liquid}
                      </Badge>
                    ) : (
                      item.handling.liquid
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          {t("performance.pageTitle")}
        </h1>
        <p className="text-muted-foreground">{t("performance.description")}</p>
      </div>

      {/* Stat Abbreviations Info Section */}
      <Card className="mb-8 border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Info className="w-5 h-5" />
            {t("performance.abbreviationInfo.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">
                {t("stats.speedHardShort")}
              </div>
              <div className="text-sm text-gray-600">
                {t("stats.speedHard")}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">
                {t("stats.speedSoftShort")}
              </div>
              <div className="text-sm text-gray-600">
                {t("stats.speedSoft")}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">
                {t("stats.speedLiquidShort")}
              </div>
              <div className="text-sm text-gray-600">
                {t("stats.speedLiquid")}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">
                {t("stats.accelerationShort")}
              </div>
              <div className="text-sm text-gray-600">
                {t("stats.acceleration")}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">
                {t("stats.weightShort")}
              </div>
              <div className="text-sm text-gray-600">{t("stats.weight")}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">
                {t("stats.handlingHardShort")}
              </div>
              <div className="text-sm text-gray-600">
                {t("stats.handlingHard")}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">
                {t("stats.handlingSoftShort")}
              </div>
              <div className="text-sm text-gray-600">
                {t("stats.handlingSoft")}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-blue-600">
                {t("stats.handlingLiquidShort")}
              </div>
              <div className="text-sm text-gray-600">
                {t("stats.handlingLiquid")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="drivers">
            {t("performance.tabs.drivers")} ({GROUPED_DRIVERS.length})
          </TabsTrigger>
          <TabsTrigger value="machines">
            {t("performance.tabs.machines")} ({GROUPED_MACHINES.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="drivers" className="mt-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              {t("performance.tabs.drivers")}
            </h2>
            {renderStatsTable(
              filteredDrivers,
              driverSearch,
              setDriverSearch,
              "driver",
              driverSpecFilter,
              setDriverSpecFilter
            )}
          </div>
        </TabsContent>

        <TabsContent value="machines" className="mt-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              {t("performance.tabs.machines")}
            </h2>
            {renderStatsTable(
              filteredMachines,
              machineSearch,
              setMachineSearch,
              "machine",
              machineSpecFilter,
              setMachineSpecFilter
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

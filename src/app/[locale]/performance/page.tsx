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
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function PerformancePage() {
  const t = useTranslations();
  const [driverSearch, setDriverSearch] = useState("");
  const [machineSearch, setMachineSearch] = useState("");
  const [driverSpecFilter, setDriverSpecFilter] = useState<
    SpeedSpecialization | "all"
  >("all");
  const [machineSpecFilter, setMachineSpecFilter] = useState<
    SpeedSpecialization | "all"
  >("all");

  const filteredDrivers = GROUPED_DRIVERS.filter((driver) => {
    const matchesSearch = driver.names.some((name) =>
      name.toLowerCase().includes(driverSearch.toLowerCase())
    );
    const matchesSpec =
      driverSpecFilter === "all" ||
      analyzeSpeedSpecialization(driver) === driverSpecFilter;
    return matchesSearch && matchesSpec;
  });

  const filteredMachines = GROUPED_MACHINES.filter((machine) => {
    const matchesSearch = machine.names.some((name) =>
      name.toLowerCase().includes(machineSearch.toLowerCase())
    );
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
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              全て
            </TabsTrigger>
            <TabsTrigger value="hard" className="text-xs sm:text-sm">
              硬
            </TabsTrigger>
            <TabsTrigger value="soft" className="text-xs sm:text-sm">
              柔
            </TabsTrigger>
            <TabsTrigger value="liquid" className="text-xs sm:text-sm">
              液
            </TabsTrigger>
            <TabsTrigger value="balance" className="text-xs sm:text-sm">
              バランス
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">
              {type === "driver" ? t("stats.driver") : t("stats.machine")}
            </TableHead>
            <TableHead className="w-1/6 text-center">
              {t("stats.speedHard")}
            </TableHead>
            <TableHead className="w-1/6 text-center">
              {t("stats.speedSoft")}
            </TableHead>
            <TableHead className="w-1/6 text-center">
              {t("stats.speedLiquid")}
            </TableHead>
            <TableHead className="w-1/6 text-center">
              {t("stats.acceleration")}
            </TableHead>
            <TableHead className="w-1/6 text-center">
              {t("stats.weight")}
            </TableHead>
            <TableHead className="w-1/6 text-center">
              {t("stats.handling")}
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
                      <div key={name} className="flex items-center space-x-3">
                        <div className="w-10 h-10 relative flex-shrink-0">
                          <Image
                            src={`/${
                              type === "driver" ? "drivers" : "machines"
                            }/${name}.png`}
                            alt={name}
                            fill
                            className="object-contain rounded"
                          />
                        </div>
                        <span className="text-sm">{name}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {specialization === "hard" ? (
                    <Badge variant="default">{item.speed.hard}</Badge>
                  ) : (
                    item.speed.hard
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {specialization === "soft" ? (
                    <Badge variant="default">{item.speed.soft}</Badge>
                  ) : (
                    item.speed.soft
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {specialization === "liquid" ? (
                    <Badge variant="default">{item.speed.liquid}</Badge>
                  ) : (
                    item.speed.liquid
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {item.acceleration}
                </TableCell>
                <TableCell className="text-center">{item.weight}</TableCell>
                <TableCell className="text-center">{item.handling}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
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

      <Tabs defaultValue="drivers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="drivers">
            {t("performance.tabs.drivers")} ({GROUPED_DRIVERS.length})
          </TabsTrigger>
          <TabsTrigger value="machines">
            {t("performance.tabs.machines")} ({GROUPED_MACHINES.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="drivers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("performance.tabs.drivers")}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStatsTable(
                filteredDrivers,
                driverSearch,
                setDriverSearch,
                "driver",
                driverSpecFilter,
                setDriverSpecFilter
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="machines" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("performance.tabs.machines")}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStatsTable(
                filteredMachines,
                machineSearch,
                setMachineSearch,
                "machine",
                machineSpecFilter,
                setMachineSpecFilter
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

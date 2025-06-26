"use client";

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
import {
  GROUPED_DRIVERS,
  GROUPED_MACHINES,
  type GroupedStats,
  analyzeSpeedSpecialization,
} from "@/lib/stats";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useState } from "react";

export default function PerformancePage() {
  const [driverSearch, setDriverSearch] = useState("");
  const [machineSearch, setMachineSearch] = useState("");

  const filteredDrivers = GROUPED_DRIVERS.filter((driver) =>
    driver.names.some((name) =>
      name.toLowerCase().includes(driverSearch.toLowerCase())
    )
  );

  const filteredMachines = GROUPED_MACHINES.filter((machine) =>
    machine.names.some((name) =>
      name.toLowerCase().includes(machineSearch.toLowerCase())
    )
  );

  const renderStatsTable = (
    items: GroupedStats[],
    searchValue: string,
    onSearchChange: (value: string) => void,
    type: "driver" | "machine"
  ) => (
    <div className="space-y-4">
      <Input
        placeholder={`${type === "driver" ? "ドライバー" : "マシン"}を検索...`}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">
              {type === "driver" ? "ドライバー" : "マシン"}
            </TableHead>
            <TableHead className="w-1/6 text-center">スピード（滑）</TableHead>
            <TableHead className="w-1/6 text-center">スピード（荒）</TableHead>
            <TableHead className="w-1/6 text-center">スピード（水）</TableHead>
            <TableHead className="w-1/6 text-center">かそく</TableHead>
            <TableHead className="w-1/6 text-center">おもさ</TableHead>
            <TableHead className="w-1/6 text-center">まがりやすさ</TableHead>
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
                  {specialization === "smooth" ? (
                    <Badge variant="default">{item.speed.smooth}</Badge>
                  ) : (
                    item.speed.smooth
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {specialization === "rough" ? (
                    <Badge variant="default">{item.speed.rough}</Badge>
                  ) : (
                    item.speed.rough
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {specialization === "water" ? (
                    <Badge variant="default">{item.speed.water}</Badge>
                  ) : (
                    item.speed.water
                  )}
                </TableCell>
                <TableCell className="text-center">{item.acceleration}</TableCell>
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
        <h1 className="text-4xl font-bold text-blue-600 mb-2">性能一覧</h1>
        <p className="text-muted-foreground">
          全ドライバーとマシンの性能を確認できます
        </p>
      </div>

      <Tabs defaultValue="drivers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="drivers">
            ドライバー ({GROUPED_DRIVERS.length}グループ)
          </TabsTrigger>
          <TabsTrigger value="machines">
            マシン ({GROUPED_MACHINES.length}グループ)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="drivers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>ドライバー性能一覧</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStatsTable(
                filteredDrivers,
                driverSearch,
                setDriverSearch,
                "driver"
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="machines" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>マシン性能一覧</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStatsTable(
                filteredMachines,
                machineSearch,
                setMachineSearch,
                "machine"
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

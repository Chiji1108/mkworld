"use client";

import { useState } from "react";
import Image from "next/image";
import { DRIVERS, MACHINES, type Stats } from "@/lib/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function PerformancePage() {
  const [driverSearch, setDriverSearch] = useState("");
  const [machineSearch, setMachineSearch] = useState("");

  const filteredDrivers = DRIVERS.filter(driver =>
    driver.name.toLowerCase().includes(driverSearch.toLowerCase())
  );

  const filteredMachines = MACHINES.filter(machine =>
    machine.name.toLowerCase().includes(machineSearch.toLowerCase())
  );

  const renderStatsTable = (items: Stats[], searchValue: string, onSearchChange: (value: string) => void, type: "driver" | "machine") => (
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
            <TableHead>画像</TableHead>
            <TableHead>名前</TableHead>
            <TableHead>スピード（滑）</TableHead>
            <TableHead>スピード（荒）</TableHead>
            <TableHead>スピード（水）</TableHead>
            <TableHead>かそく</TableHead>
            <TableHead>おもさ</TableHead>
            <TableHead>まがりやすさ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="w-12 h-12 relative">
                  <Image
                    src={`/${type === "driver" ? "drivers" : "machines"}/${item.name}.png`}
                    alt={item.name}
                    fill
                    className="object-contain rounded"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="text-center">{item.speed.smooth}</TableCell>
              <TableCell className="text-center">{item.speed.rough}</TableCell>
              <TableCell className="text-center">{item.speed.water}</TableCell>
              <TableCell className="text-center">{item.acceleration}</TableCell>
              <TableCell className="text-center">{item.weight}</TableCell>
              <TableCell className="text-center">{item.handling}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">性能一覧</h1>
        <p className="text-muted-foreground">全ドライバーとマシンの性能を確認できます</p>
      </div>

      <Tabs defaultValue="drivers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="drivers">ドライバー ({DRIVERS.length})</TabsTrigger>
          <TabsTrigger value="machines">マシン ({MACHINES.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="drivers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>ドライバー性能一覧</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStatsTable(filteredDrivers, driverSearch, setDriverSearch, "driver")}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="machines" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>マシン性能一覧</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStatsTable(filteredMachines, machineSearch, setMachineSearch, "machine")}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
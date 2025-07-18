"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GROUPED_DRIVERS,
  GROUPED_MACHINES,
  type GroupedStats,
} from "@/lib/stats";
import {
  translateDriverName,
  translateMachineName,
} from "@/lib/translation-helpers";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

interface Combination {
  driver: GroupedStats;
  machine: GroupedStats;
  combined: {
    speed: { hard: number; soft: number; liquid: number };
    acceleration: number;
    weight: number;
    handling: { hard: number; soft: number; liquid: number };
  };
  totalScore: number;
}

interface OptimizationCriteria {
  speedHard: boolean;
  speedSoft: boolean;
  speedLiquid: boolean;
  acceleration: boolean;
  weight: boolean;
  handlingHard: boolean;
  handlingSoft: boolean;
  handlingLiquid: boolean;
}

export default function ParetoPage() {
  const t = useTranslations();

  // nuqsでURL状態管理 - 各条件を個別のパラメータで管理
  const [speedHard, setSpeedHard] = useQueryState("speedHard", {
    defaultValue: true,
    parse: (value) => value === "true",
    serialize: (value) => String(value),
  });

  const [speedSoft, setSpeedSoft] = useQueryState("speedSoft", {
    defaultValue: false,
    parse: (value) => value === "true",
    serialize: (value) => String(value),
  });

  const [speedLiquid, setSpeedLiquid] = useQueryState("speedLiquid", {
    defaultValue: false,
    parse: (value) => value === "true",
    serialize: (value) => String(value),
  });

  const [acceleration, setAcceleration] = useQueryState("acceleration", {
    defaultValue: true,
    parse: (value) => value === "true",
    serialize: (value) => String(value),
  });

  const [weight, setWeight] = useQueryState("weight", {
    defaultValue: false,
    parse: (value) => value === "true",
    serialize: (value) => String(value),
  });

  const [handlingHard, setHandlingHard] = useQueryState("handlingHard", {
    defaultValue: false,
    parse: (value) => value === "true",
    serialize: (value) => String(value),
  });

  const [handlingSoft, setHandlingSoft] = useQueryState("handlingSoft", {
    defaultValue: false,
    parse: (value) => value === "true",
    serialize: (value) => String(value),
  });

  const [handlingLiquid, setHandlingLiquid] = useQueryState("handlingLiquid", {
    defaultValue: false,
    parse: (value) => value === "true",
    serialize: (value) => String(value),
  });

  // 従来のcriteria形式に変換（useMemoでメモ化）
  const criteria: OptimizationCriteria = useMemo(
    () => ({
      speedHard,
      speedSoft,
      speedLiquid,
      acceleration,
      weight,
      handlingHard,
      handlingSoft,
      handlingLiquid,
    }),
    [
      speedHard,
      speedSoft,
      speedLiquid,
      acceleration,
      weight,
      handlingHard,
      handlingSoft,
      handlingLiquid,
    ]
  );

  const allCombinations = useMemo(() => {
    const combinations: Combination[] = [];

    GROUPED_DRIVERS.forEach((driver) => {
      GROUPED_MACHINES.forEach((machine) => {
        const combined = {
          speed: {
            hard: driver.speed.hard + machine.speed.hard,
            soft: driver.speed.soft + machine.speed.soft,
            liquid: driver.speed.liquid + machine.speed.liquid,
          },
          acceleration: driver.acceleration + machine.acceleration,
          weight: driver.weight + machine.weight,
          handling: {
            hard: driver.handling.hard + machine.handling.hard,
            soft: driver.handling.soft + machine.handling.soft,
            liquid: driver.handling.liquid + machine.handling.liquid,
          },
        };

        let totalScore = 0;
        if (criteria.speedHard) totalScore += combined.speed.hard;
        if (criteria.speedSoft) totalScore += combined.speed.soft;
        if (criteria.speedLiquid) totalScore += combined.speed.liquid;
        if (criteria.acceleration) totalScore += combined.acceleration;
        if (criteria.weight) totalScore += combined.weight;
        if (criteria.handlingHard) totalScore += combined.handling.hard;
        if (criteria.handlingSoft) totalScore += combined.handling.soft;
        if (criteria.handlingLiquid) totalScore += combined.handling.liquid;

        combinations.push({
          driver,
          machine,
          combined,
          totalScore,
        });
      });
    });

    return combinations;
  }, [criteria]);

  const paretoOptimalCombinations = useMemo(() => {
    const sorted = [...allCombinations].sort(
      (a, b) => b.totalScore - a.totalScore
    );
    return sorted.slice(0, 100);
  }, [allCombinations]);

  const criteriaCount = Object.values(criteria).filter(Boolean).length;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          {t("pareto.pageTitle")}
        </h1>
        <p className="text-muted-foreground">{t("pareto.description")}</p>
      </div>

      {/* Pareto Info Section */}
      <Card className="mb-8 border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Info className="w-5 h-5" />
            {t("pareto.info.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600">
            {t("pareto.info.description")}
          </p>
          <p className="text-sm text-blue-600 font-medium">
            {t("pareto.info.example")}
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("pareto.optimization.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="speedHard"
                  checked={speedHard}
                  onCheckedChange={(checked) => setSpeedHard(!!checked)}
                />
                <label
                  htmlFor="speedHard"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.speedHard")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="speedSoft"
                  checked={speedSoft}
                  onCheckedChange={(checked) => setSpeedSoft(!!checked)}
                />
                <label
                  htmlFor="speedSoft"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.speedSoft")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="speedLiquid"
                  checked={speedLiquid}
                  onCheckedChange={(checked) => setSpeedLiquid(!!checked)}
                />
                <label
                  htmlFor="speedLiquid"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.speedLiquid")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceleration"
                  checked={acceleration}
                  onCheckedChange={(checked) => setAcceleration(!!checked)}
                />
                <label
                  htmlFor="acceleration"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.acceleration")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weight"
                  checked={weight}
                  onCheckedChange={(checked) => setWeight(!!checked)}
                />
                <label
                  htmlFor="weight"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.weight")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="handlingHard"
                  checked={handlingHard}
                  onCheckedChange={(checked) => setHandlingHard(!!checked)}
                />
                <label
                  htmlFor="handlingHard"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.handlingHard")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="handlingSoft"
                  checked={handlingSoft}
                  onCheckedChange={(checked) => setHandlingSoft(!!checked)}
                />
                <label
                  htmlFor="handlingSoft"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.handlingSoft")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="handlingLiquid"
                  checked={handlingLiquid}
                  onCheckedChange={(checked) => setHandlingLiquid(!!checked)}
                />
                <label
                  htmlFor="handlingLiquid"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("stats.handlingLiquid")}
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {criteriaCount === 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {t("pareto.optimization.description")}
            </AlertDescription>
          </Alert>
        )}

        {paretoOptimalCombinations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              {t("pareto.results.title")} (100)
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center text-[10px] sm:text-sm">
                      {t("pareto.results.score")}
                    </TableHead>
                    <TableHead className="text-center text-[10px] sm:text-sm">
                      {t("stats.driver")}
                    </TableHead>
                    <TableHead className="text-center text-[10px] sm:text-sm">
                      {t("stats.machine")}
                    </TableHead>
                    <TableHead
                      className={
                        speedHard
                          ? "bg-primary/10 text-center text-[10px] sm:text-sm px-1 sm:px-3"
                          : "text-center text-[10px] sm:text-sm px-1 sm:px-3"
                      }
                    >
                      <span className="hidden sm:inline">
                        {t("stats.speedHard")}
                      </span>
                      <span className="sm:hidden">
                        {t("stats.speedHardShort")}
                      </span>
                    </TableHead>
                    <TableHead
                      className={
                        speedSoft
                          ? "bg-primary/10 text-center text-[10px] sm:text-sm px-1 sm:px-3"
                          : "text-center text-[10px] sm:text-sm px-1 sm:px-3"
                      }
                    >
                      <span className="hidden sm:inline">
                        {t("stats.speedSoft")}
                      </span>
                      <span className="sm:hidden">
                        {t("stats.speedSoftShort")}
                      </span>
                    </TableHead>
                    <TableHead
                      className={
                        speedLiquid
                          ? "bg-primary/10 text-center text-[10px] sm:text-sm px-1 sm:px-3"
                          : "text-center text-[10px] sm:text-sm px-1 sm:px-3"
                      }
                    >
                      <span className="hidden sm:inline">
                        {t("stats.speedLiquid")}
                      </span>
                      <span className="sm:hidden">
                        {t("stats.speedLiquidShort")}
                      </span>
                    </TableHead>
                    <TableHead
                      className={
                        acceleration
                          ? "bg-primary/10 text-center text-[10px] sm:text-sm px-1 sm:px-3"
                          : "text-center text-[10px] sm:text-sm px-1 sm:px-3"
                      }
                    >
                      <span className="hidden sm:inline">
                        {t("stats.acceleration")}
                      </span>
                      <span className="sm:hidden">
                        {t("stats.accelerationShort")}
                      </span>
                    </TableHead>
                    <TableHead
                      className={
                        weight
                          ? "bg-primary/10 text-center text-[10px] sm:text-sm px-1 sm:px-3"
                          : "text-center text-[10px] sm:text-sm px-1 sm:px-3"
                      }
                    >
                      <span className="hidden sm:inline">
                        {t("stats.weight")}
                      </span>
                      <span className="sm:hidden">
                        {t("stats.weightShort")}
                      </span>
                    </TableHead>
                    <TableHead
                      className={
                        handlingHard
                          ? "bg-primary/10 text-center text-[10px] sm:text-sm px-1 sm:px-3"
                          : "text-center text-[10px] sm:text-sm px-1 sm:px-3"
                      }
                    >
                      <span className="hidden sm:inline">
                        {t("stats.handlingHard")}
                      </span>
                      <span className="sm:hidden">
                        {t("stats.handlingHardShort")}
                      </span>
                    </TableHead>
                    <TableHead
                      className={
                        handlingSoft
                          ? "bg-primary/10 text-center text-[10px] sm:text-sm px-1 sm:px-3"
                          : "text-center text-[10px] sm:text-sm px-1 sm:px-3"
                      }
                    >
                      <span className="hidden sm:inline">
                        {t("stats.handlingSoft")}
                      </span>
                      <span className="sm:hidden">
                        {t("stats.handlingSoftShort")}
                      </span>
                    </TableHead>
                    <TableHead
                      className={
                        handlingLiquid
                          ? "bg-primary/10 text-center text-[10px] sm:text-sm px-1 sm:px-3"
                          : "text-center text-[10px] sm:text-sm px-1 sm:px-3"
                      }
                    >
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
                  {paretoOptimalCombinations.map((combo) => {
                    return (
                      <TableRow
                        key={`${combo.driver.names.join(
                          "-"
                        )}-${combo.machine.names.join("-")}`}
                      >
                        <TableCell className="text-center font-bold text-[11px] sm:text-sm px-1 sm:px-3">
                          {combo.totalScore}
                        </TableCell>
                        <TableCell
                          style={{ backgroundColor: combo.driver.color }}
                        >
                          <div className="space-y-2">
                            {combo.driver.names.map((name) => (
                              <div
                                key={name}
                                className="flex items-center space-x-1 sm:space-x-2"
                              >
                                <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                                  <Image
                                    src={`/drivers/${name}.png`}
                                    alt={translateDriverName(name, t)}
                                    fill
                                    className="object-contain rounded"
                                  />
                                </div>
                                <span className="text-[11px] sm:text-sm">
                                  {translateDriverName(name, t)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell
                          style={{ backgroundColor: combo.machine.color }}
                        >
                          <div className="space-y-2">
                            {combo.machine.names.map((name) => (
                              <div
                                key={name}
                                className="flex items-center space-x-1 sm:space-x-2"
                              >
                                <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                                  <Image
                                    src={`/machines/${name}.png`}
                                    alt={translateMachineName(name, t)}
                                    fill
                                    className="object-contain rounded"
                                  />
                                </div>
                                <span className="text-[11px] sm:text-sm">
                                  {translateMachineName(name, t)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell
                          className={`text-center text-[11px] sm:text-sm px-1 sm:px-3 ${
                            speedHard ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.speed.hard}
                        </TableCell>
                        <TableCell
                          className={`text-center text-[11px] sm:text-sm px-1 sm:px-3 ${
                            speedSoft ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.speed.soft}
                        </TableCell>
                        <TableCell
                          className={`text-center text-[11px] sm:text-sm px-1 sm:px-3 ${
                            speedLiquid ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.speed.liquid}
                        </TableCell>
                        <TableCell
                          className={`text-center text-[11px] sm:text-sm px-1 sm:px-3 ${
                            acceleration ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.acceleration}
                        </TableCell>
                        <TableCell
                          className={`text-center text-[11px] sm:text-sm px-1 sm:px-3 ${
                            weight ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.weight}
                        </TableCell>
                        <TableCell
                          className={`text-center text-[11px] sm:text-sm px-1 sm:px-3 ${
                            handlingHard ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.handling.hard}
                        </TableCell>
                        <TableCell
                          className={`text-center text-[11px] sm:text-sm px-1 sm:px-3 ${
                            handlingSoft ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.handling.soft}
                        </TableCell>
                        <TableCell
                          className={`text-center text-[11px] sm:text-sm px-1 sm:px-3 ${
                            handlingLiquid ? "bg-primary/10" : ""
                          }`}
                        >
                          {combo.combined.handling.liquid}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
